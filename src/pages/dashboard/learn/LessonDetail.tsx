import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import {
  Check,
  Lock,
  Volume2,
  ArrowBigRightDash,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import useSound from 'use-sound';
import resemble from 'resemblejs';

// Komponen & utilitas
import api from '@/services/api';
import WritingCanvas, {
  type CanvasHandle,
} from '@/components/utils/WritingCanvas';
import Success from '@/components/icon/Success';
import Fail from '@/components/icon/Fail';
import EmojiHunggingFace from '@/components/icon/EmojiHunggingFace';
import EmojiSad from '@/components/icon/EmojiSad';
import EmojiGrimacing from '@/components/icon/EmojiGrimacing';
import Loader from '@/components/ui/loader';
import { slugify } from '@/lib/utils';

// --- DEFINISI TIPE ---

interface Lesson {
  id: number;
  title: string;
}

interface QuizLevel {
  id: number;
  title: string;
  level: number;
  is_completed?: boolean;
}

interface QuizOption {
  id: number;
  option_text: string;
  aksara_text: string;
}

interface QuizQuestion {
  session_id: string;
  question_id: number;
  total_questions: number;
  current_question_index: number;
  question_type:
    | 'pilihan_ganda_aksara'
    | 'pilihan_ganda_batak'
    | 'nulis_aksara';
  question_text: string;
  image_url: string;
  audio_url: string;
  options: QuizOption[];
}

interface SubmitResponseData {
  is_correct: boolean;
  correct_option_id: number;
  quiz_finished: boolean;
  next_question: QuizQuestion | null;
  final_result?: {
    final_score: number;
    xp_earned: number;
  };
}

interface UserProfile {
  name: string;
  total_xp: number;
}

interface ApiResponse<T> {
  data: T;
}

// --- KOMPONEN UTAMA ---

function createCumulativeAdder() {
  let currentValue = 0; // Inisialisasi nilai awal
  const increment = 0.1; // Nilai penambahan

  return function () {
    currentValue += increment;
    return currentValue;
  };
}

function LessonDetail() {
  const { slug } = useParams<{ slug: string }>();

  const [view, setView] = useState<
    'loading' | 'level_selection' | 'in_quiz' | 'results'
  >('loading');
  const [levels, setLevels] = useState<QuizLevel[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(
    null
  );
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState({ isCorrect: false, isOpen: false });
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [totalQuizQuestions, setTotalQuizQuestions] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [nextQuestionData, setNextQuestionData] = useState<QuizQuestion | null>(
    null
  );
  const canvasRef = useRef<CanvasHandle>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState(0);
  const levelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const LEVELS_PER_PAGE = 10;
  const PASSING_SCORE = 70;

  // State baru untuk melacak apakah kuis yang dikerjakan sudah selesai sebelumnya
  const [isRepeatingCompletedQuiz, setIsRepeatingCompletedQuiz] =
    useState(false);

  useEffect(() => {
    const fetchLessonData = async () => {
      if (!slug) return;
      setView('loading');
      try {
        const lessonsResponse =
          await api.get<ApiResponse<Lesson[]>>('v1/lessons');
        const allLessons = lessonsResponse.data.data;
        const currentLesson = allLessons.find((l) => slugify(l.title) === slug);

        if (currentLesson) {
          const levelsResponse = await api.get<ApiResponse<QuizLevel[]>>(
            `v1/lessons/${currentLesson.id}/quizzes`
          );
          const fetchedLevels = levelsResponse.data.data;
          setLevels(fetchedLevels);

          const lastCompletedIndex = fetchedLevels
            .map((l) => l.is_completed)
            .lastIndexOf(true);
          const targetLevelIndex =
            lastCompletedIndex === -1 ? 0 : lastCompletedIndex + 1;
          const finalTargetIndex = Math.min(
            targetLevelIndex,
            fetchedLevels.length - 1
          );

          const targetPage = Math.floor(finalTargetIndex / LEVELS_PER_PAGE);
          setCurrentPage(targetPage);

          setTimeout(() => {
            levelRefs.current[finalTargetIndex]?.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
          }, 100);

          setView('level_selection');
        } else {
          console.error(`Lesson with slug "${slug}" not found.`);
          setView('level_selection');
        }
      } catch (error) {
        console.error('Gagal mengambil data pelajaran:', error);
      }
    };

    fetchLessonData();
  }, [slug]);

  const handleStartQuiz = async (quizId: number) => {
    // Cek status level sebelum kuis dimulai
    const levelInfo = levels.find((l) => l.id === quizId);
    setIsRepeatingCompletedQuiz(levelInfo?.is_completed ?? false);

    setView('loading');
    try {
      const response = await api.get<ApiResponse<QuizQuestion>>(
        `v1/quizzes/${quizId}/start`
      );
      setCurrentQuestion(response.data.data);
      setCorrectAnswersCount(0);
      setTotalQuizQuestions(response.data.data.total_questions);
      setXpEarned(0);
      setView('in_quiz');
    } catch (error) {
      console.error('Gagal memulai kuis:', error);
      setView('level_selection');
    }
  };

  const processAndShowFeedback = (responseData: SubmitResponseData) => {
    if (responseData.is_correct) {
      setCorrectAnswersCount((prevCount) => prevCount + 1);
    }
    setFeedback({ isCorrect: responseData.is_correct, isOpen: true });
    setNextQuestionData(responseData.next_question);
    // --- PERBAIKAN: Hapus blok 'if' ini agar XP tidak diambil dari API per soal ---
    // if (responseData.quiz_finished && responseData.final_result) {
    //   setXpEarned(responseData.final_result.xp_earned);
    // }
  };

  const handleImageChoiceSubmit = async (optionId: number) => {
    if (isAnswered || !currentQuestion) return;
    setIsAnswered(true);
    setSelectedOptionId(optionId);
    try {
      const response = await api.post<ApiResponse<SubmitResponseData>>(
        'v1/quizzes/submit',
        {
          session_id: currentQuestion.session_id,
          question_id: currentQuestion.question_id,
          option_id: optionId,
        }
      );
      processAndShowFeedback(response.data.data);
    } catch (error) {
      console.error('Gagal mengirim jawaban:', error);
      setIsAnswered(false);
    }
  };

  const handleDrawingSubmit = async () => {
    if (isAnswered || !canvasRef.current || !currentQuestion) return;
    setIsAnswered(true);
    const userImage = canvasRef.current.getStage()?.toDataURL();
    if (!userImage) {
      setIsAnswered(false);
      return;
    }
    resemble(userImage)
      .compareTo(`/assets/hurufaksara/${currentQuestion.image_url}`)
      .onComplete(async (data) => {
        const value = data.misMatchPercentage < 6 ? true : false;
        try {
          const response = await api.post<ApiResponse<SubmitResponseData>>(
            'v1/quizzes/submit-drawing',
            {
              session_id: currentQuestion.session_id,
              question_id: currentQuestion.question_id,
              is_correct: value,
            }
          );
          processAndShowFeedback(response.data.data);
        } catch (error) {
          console.error('Gagal mengirim jawaban gambar:', error);
          setIsAnswered(false);
        }
      });
  };

  const handleNext = async () => {
    setFeedback({ ...feedback, isOpen: false });
    setIsAnswered(false);
    setSelectedOptionId(null);
    canvasRef.current?.reset();

    if (nextQuestionData) {
      setCurrentQuestion(nextQuestionData);
      setNextQuestionData(null);
    } else {
      // Kuis selesai, sekarang hitung skor dan tentukan XP
      const score =
        totalQuizQuestions > 0
          ? Math.round((correctAnswersCount / totalQuizQuestions) * 100)
          : 0;

      // --- LOGIKA BARU: Tentukan XP berdasarkan kelulusan dan status pengulangan ---
      const passed = score >= PASSING_SCORE;
      if (passed && !isRepeatingCompletedQuiz) {
        setXpEarned(50);
      } else {
        setXpEarned(0);
      }
      // --- AKHIR LOGIKA BARU ---

      setView('loading');
      try {
        const profileRes =
          await api.get<ApiResponse<UserProfile>>('v1/users/profile');
        setUserProfile(profileRes.data.data);
        setView('results');
      } catch (error) {
        console.error('Gagal mengambil profil setelah kuis:', error);
        setView('level_selection');
      }
    }
  };

  const handleBackToLevels = () => {
    setView('loading');
    const fetchLevels = async () => {
      if (!slug) return;
      try {
        const lessonsResponse =
          await api.get<ApiResponse<Lesson[]>>('v1/lessons');
        const allLessons = lessonsResponse.data.data;
        const currentLesson = allLessons.find((l) => slugify(l.title) === slug);

        if (currentLesson) {
          const response = await api.get<ApiResponse<QuizLevel[]>>(
            `v1/lessons/${currentLesson.id}/quizzes`
          );
          setLevels(response.data.data);
          setCurrentQuestion(null);
          setView('level_selection');
        }
      } catch (error) {
        console.error('Gagal mengambil daftar level:', error);
      }
    };
    fetchLevels();
  };

  // --- KOMPONEN TAMPILAN (Tidak ada perubahan) ---

  const LevelSelectionView = () => {
    const totalPages = Math.ceil(levels.length / LEVELS_PER_PAGE);
    const displayedLevels = levels.slice(
      currentPage * LEVELS_PER_PAGE,
      (currentPage + 1) * LEVELS_PER_PAGE
    );
    const addDelay = createCumulativeAdder();

    return (
      <div className="w-full px-2 py-2 md:px-4 md:py-8">
        <div className="mx-auto w-full max-w-5xl">
          <div className="bg-sidebar-border motion-preset-expand rounded-2xl border p-6">
            <h1 className="font-sora text-primary text-center text-2xl font-bold md:text-3xl">
              Pilih Level
            </h1>
          </div>
          <div className="mt-5 flex flex-col gap-2">
            {displayedLevels.map((level) => {
              const originalIndex = levels.findIndex((l) => l.id === level.id);
              const isLocked =
                originalIndex > 0 &&
                !(levels[originalIndex - 1]?.is_completed ?? false);
              return (
                <Card
                  ref={(el) => {
                    levelRefs.current[originalIndex] = el;
                  }}
                  key={level.id}
                  onClick={() => !isLocked && handleStartQuiz(level.id)}
                  className={`motion-preset-expand motion-delay-[${addDelay()}s] p-4 transition ease-linear ${
                    isLocked
                      ? 'cursor-not-allowed opacity-50'
                      : 'hover:shadow-primary cursor-pointer hover:opacity-85'
                  }`}
                >
                  <CardContent className="p-0">
                    <div className="flex flex-row items-center justify-between">
                      <div className="flex flex-row items-center justify-start gap-4">
                        <p className="font-bold">{level.level}.</p>
                        <p>{level.title}</p>
                      </div>
                      {isLocked ? (
                        <Lock className="text-muted-foreground h-6 w-6" />
                      ) : (
                        level.is_completed && (
                          <Check className="h-6 w-6 text-green-500" />
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-4">
              <Button
                onClick={() => setCurrentPage((p) => p - 1)}
                disabled={currentPage === 0}
                size="icon"
              >
                <ChevronLeft />
              </Button>
              <span className="font-semibold">
                Halaman {currentPage + 1} dari {totalPages}
              </span>
              <Button
                onClick={() => setCurrentPage((p) => p + 1)}
                disabled={currentPage >= totalPages - 1}
                size="icon"
              >
                <ChevronRight />
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const QuizView = () => {
    const [playAudio] = useSound(`/assets/audio/${currentQuestion?.audio_url}`);
    const progressPercentage = currentQuestion
      ? ((currentQuestion.current_question_index - 1) /
          currentQuestion.total_questions) *
        100
      : 0;

    if (!currentQuestion) return <LevelSelectionView />;

    return (
      <div className="motion-preset-fade flex w-full flex-col items-center justify-center p-5 md:mt-20">
        <div className="mb-5 w-full max-w-4xl">
          <p className="text-center text-lg font-semibold">
            Soal {currentQuestion.current_question_index} dari{' '}
            {currentQuestion.total_questions}
          </p>
          <Progress value={progressPercentage} className="mt-2" />
        </div>

        <div className="w-full max-w-4xl">
          {currentQuestion.question_type === 'pilihan_ganda_aksara' && (
            <div className="mt-5 flex w-full flex-col items-center">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="text-center text-xl">
                    {currentQuestion.question_text}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center p-4">
                  <img
                    src={`/assets/hurufaksara/${currentQuestion.image_url}`}
                    alt="Aksara Batak"
                    className="motion-preset-pop motion-delay-100 h-48 w-48 rounded-md md:h-64 md:w-64"
                  />
                </CardContent>
                <div className="mr-3 flex justify-end px-3">
                  <Button
                    onClick={() => playAudio()}
                    variant={'circle-default'}
                    size={'icon'}
                    className="size-12"
                  >
                    <Volume2 />
                  </Button>
                </div>
              </Card>
              <div className="mt-6 grid w-full grid-cols-2 gap-4 md:grid-cols-4">
                {currentQuestion.options?.map((option) => (
                  <Button
                    key={option.id}
                    onClick={() => handleImageChoiceSubmit(option.id)}
                    disabled={isAnswered}
                    variant={
                      isAnswered && selectedOptionId === option.id
                        ? feedback.isCorrect
                          ? 'default'
                          : 'destructive'
                        : 'secondary'
                    }
                  >
                    {option.option_text || option.aksara_text}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {currentQuestion.question_type === 'pilihan_ganda_batak' && (
            <div className="mt-5 flex w-full flex-col items-center">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="text-center text-xl">
                    {currentQuestion.question_text}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center p-4">
                  <img
                    src={`/assets/characters/${currentQuestion.image_url}`}
                    alt="Karakter Batak"
                    className="motion-preset-pop motion-delay-100 h-64 rounded-md md:h-81"
                  />
                </CardContent>
              </Card>
              <div className="mt-6 grid w-full grid-cols-2 gap-4 md:grid-cols-4">
                {currentQuestion.options?.map((option) => (
                  <Button
                    key={option.id}
                    onClick={() => handleImageChoiceSubmit(option.id)}
                    disabled={isAnswered}
                    variant={
                      isAnswered && selectedOptionId === option.id
                        ? feedback.isCorrect
                          ? 'default'
                          : 'destructive'
                        : 'secondary'
                    }
                  >
                    {option.option_text || option.aksara_text}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {currentQuestion.question_type === 'nulis_aksara' && (
            <div className="mt-5 flex w-full flex-col items-center">
              <Card className="inline-block w-auto">
                <CardHeader>
                  <CardTitle className="text-center text-xl">
                    {currentQuestion.question_text}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex flex-col items-center gap-5 md:flex-row">
                    <img
                      src={`/assets/hurufaksara/${currentQuestion.image_url}`}
                      alt="Karakter referensi"
                      className="max-h-[500px] max-w-[500px] rounded-md border border-solid"
                    />
                    <WritingCanvas
                      ref={canvasRef}
                      imageUrl={`/assets/hurufaksara/${currentQuestion.image_url}`}
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-6">
                <Button onClick={handleDrawingSubmit} disabled={isAnswered}>
                  Periksa Jawaban
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const ResultsView = () => {
    const score =
      totalQuizQuestions > 0
        ? Math.round((correctAnswersCount / totalQuizQuestions) * 100)
        : 0;

    const passed = score >= PASSING_SCORE;

    return (
      <div
        className={`mt-10 flex items-center justify-center md:mt-20 ${passed ? 'motion-preset-expand' : 'motion-preset-focus'}`}
      >
        <Card className="w-full max-w-[750px] px-5 py-5">
          <CardHeader>
            <h2 className="mb-5 text-center text-2xl font-bold">
              Kuis Selesai!
            </h2>
            {score >= PASSING_SCORE ? (
              <EmojiHunggingFace />
            ) : score >= 40 ? (
              <EmojiGrimacing />
            ) : (
              <EmojiSad />
            )}
          </CardHeader>
          <CardContent className="text-center">
            <p
              className={`text-lg font-semibold ${passed ? 'text-green-500' : 'text-red-500'}`}
            >
              {passed
                ? 'Selamat, Anda Lulus!'
                : 'Coba lagi, Anda belum mencapai skor minimal.'}
            </p>

            <h3 className="mt-4 text-xl">Nilai Akhir Anda:</h3>
            <h1
              className={`text-7xl font-bold ${
                score >= PASSING_SCORE
                  ? 'text-green-500'
                  : score >= 40
                    ? 'text-muted-foreground'
                    : 'text-red-500'
              }`}
            >
              {score}
            </h1>
            <p className="mt-4 text-lg">
              XP Didapat:{' '}
              <span className="text-primary font-bold">+{xpEarned}</span>
            </p>
            <p className="mt-1 text-lg">
              Total XP Sekarang:{' '}
              <span className="font-bold">{userProfile?.total_xp}</span>
            </p>
            <div className="mt-10 flex items-center justify-center gap-6">
              <Button onClick={handleBackToLevels} size="lg">
                Kembali ke Level
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  if (view === 'loading') {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full">
      {view === 'level_selection' && <LevelSelectionView />}
      {view === 'in_quiz' && <QuizView />}
      {view === 'results' && <ResultsView />}

      <AlertDialog open={feedback.isOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {feedback.isCorrect ? (
                <div className="flex flex-col items-center justify-center">
                  <Success />
                  <p className="text-center text-xl font-bold text-green-400">
                    Benar!
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <Fail />
                  <p className="text-center text-xl font-bold text-red-400">
                    Salah!
                  </p>
                </div>
              )}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleNext}>
              Lanjut <ArrowBigRightDash className="ml-2" />
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default LessonDetail;

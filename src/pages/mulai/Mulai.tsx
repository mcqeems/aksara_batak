import { useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom'; // <-- Impor Link
import { Navbar } from '@/components/layout/navbar';
import WritingCanvas, {
  type CanvasHandle,
} from '@/components/utils/WritingCanvas';
import resemble from 'resemblejs';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ArrowBigRightDash, Volume2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Fail from '@/components/icon/Fail';
import Success from '@/components/icon/Success';
import EmojiHunggingFace from '@/components/icon/EmojiHunggingFace';
import EmojiSad from '@/components/icon/EmojiSad';
import EmojiGrimacing from '@/components/icon/EmojiGrimacing';
import useSound from 'use-sound';
import { useAuth } from '@/hooks/useAuth';

// --- DATA KUIS (TIDAK ADA PERUBAHAN) ---
const quizData = [
  // ... data kuis Anda tetap sama ...
  {
    id: 1,
    type: 'multiple-choice',
    questionText: 'Aksara Batak ini dibaca...',
    image: '/assets/hurufaksara/vokal/a.png',
    audio: '/assets/audio/a.mp3',
    options: ['i', 'a', 'o', 'u'],
    correctAnswer: 'a',
  },
  {
    id: 2,
    type: 'multiple-choice',
    questionText: 'Aksara Batak ini dibaca...',
    image: '/assets/hurufaksara/vokal/i.png',
    audio: '/assets/audio/i.mp3',
    options: ['e', 'u', 'i', 'a'],
    correctAnswer: 'i',
  },
  {
    id: 3,
    type: 'multiple-choice',
    questionText: 'Aksara Batak ini dibaca...',
    image: '/assets/hurufaksara/vokal/u.png',
    audio: '/assets/audio/u.mp3',
    options: ['o', 'u', 'a', 'i'],
    correctAnswer: 'u',
  },
  {
    id: 4,
    type: 'multiple-choice',
    questionText: 'Aksara Batak ini dibaca...',
    image: '/assets/hurufaksara/vokal/e.png',
    audio: '/assets/audio/e.mp3',
    options: ['e', 'i', 'a', 'u'],
    correctAnswer: 'e',
  },
  {
    id: 5,
    type: 'multiple-choice',
    questionText: 'Aksara Batak ini dibaca...',
    image: '/assets/hurufaksara/vokal/o.png',
    audio: '/assets/audio/o.mp3',
    options: ['a', 'o', 'i', 'u'],
    correctAnswer: 'o',
  },
  {
    id: 6,
    type: 'writing',
    questionText: 'Tuliskan aksara untuk huruf "a"!',
    image: '/assets/hurufaksara/vokal/a.png',
    correctAnswer: 'a',
  },
  {
    id: 7,
    type: 'writing',
    questionText: 'Tuliskan aksara untuk huruf "i"!',
    image: '/assets/hurufaksara/vokal/i.png',
    correctAnswer: 'i',
  },
  {
    id: 8,
    type: 'writing',
    questionText: 'Tuliskan aksara untuk huruf "u"!',
    image: '/assets/hurufaksara/vokal/u.png',
    correctAnswer: 'u',
  },
  {
    id: 9,
    type: 'writing',
    questionText: 'Tuliskan aksara untuk huruf "e"!',
    image: '/assets/hurufaksara/vokal/e.png',
    correctAnswer: 'e',
  },
  {
    id: 10,
    type: 'writing',
    questionText: 'Tuliskan aksara untuk huruf "o"!',
    image: '/assets/hurufaksara/vokal/o.png',
    correctAnswer: 'o',
  },
];

function Mulai() {
  // --- STATE BARU UNTUK KONTROL TAMPILAN ---
  const [quizStarted, setQuizStarted] = useState(false);
  const canvasRef = useRef<CanvasHandle>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [feedback, setFeedback] = useState<React.ReactNode>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const currentQuestion = quizData[currentQuestionIndex];

  const { isAuthenticated } = useAuth();

  // --- LOGIKA FUNGSI (TIDAK ADA PERUBAHAN) ---
  const processAnswer = (isCorrect: boolean) => {
    setFeedback(
      isCorrect ? (
        <div className="flex flex-col items-center justify-center">
          {' '}
          <Success />{' '}
          <p className="text-center text-xl font-bold text-green-400">
            Benar!
          </p>{' '}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          {' '}
          <Fail />{' '}
          <p className="text-center text-xl font-bold text-red-400">
            Salah!
          </p>{' '}
        </div>
      )
    );
    setResults((prev) => [...prev, isCorrect]);
    setIsAnswered(true);
    setIsDialogOpen(true);
  };

  const handleOptionClick = (selectedOption: string) => {
    if (isAnswered) return;
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    processAnswer(isCorrect);
  };
  const handleCheckWritingAnswer = () => {
    if (!canvasRef.current) return;
    const stage = canvasRef.current.getStage();
    if (!stage) return;
    const userImage = stage.toDataURL();
    resemble(userImage)
      .compareTo(currentQuestion.image)
      .onComplete((data) => {
        const isCorrect = data.misMatchPercentage < 6;
        processAnswer(isCorrect);
      });
  };
  const handleNextQuestion = () => {
    setIsAnswered(false);
    setIsDialogOpen(false);
    if (currentQuestion.type === 'writing') {
      canvasRef.current?.reset();
    }
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < quizData.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setQuizFinished(true);
    }
  };

  const [playAudio] = useSound(currentQuestion.audio ?? '');

  const progressPercentage = (results.length / quizData.length) * 100;

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  // --- KONDISI 2: TAMPILAN AWAL SEBELUM KUIS DIMULAI ---
  if (!quizStarted) {
    return (
      <div>
        <Navbar />
        <div className="motion-preset-fade flex min-h-screen flex-col items-center justify-center gap-5 p-5 text-center">
          <img
            src="/public/assets/logo/podahorasOriginal.svg"
            alt="PodaHoras Logo"
          ></img>
          <h1 className="text-4xl font-bold md:text-5xl">
            Selamat Datang di PodaHoras!
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg">
            Anda harus membuat akun untuk menggunakan keseluruhan fitur dari
            aplikasi kami, anda dapat mencoba demo dari aplikasi kami dengan
            mengklik tombol mulai.
          </p>
          <div className="mt-2 flex flex-col gap-4 sm:flex-row">
            <Button onClick={() => setQuizStarted(true)} size="lg">
              Mulai
            </Button>
            <div className="flex gap-4">
              <Button asChild variant="secondary" size="lg">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link to="/register">Register</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- KONDISI 3: TAMPILAN KUIS TELAH SELESAI ---
  if (quizFinished) {
    const correctAnswers = results.filter(Boolean).length;
    const score = Math.round((correctAnswers / quizData.length) * 100);

    return (
      <div>
        <Navbar />
        <div className="motion-preset-focus mt-20 flex items-center justify-center">
          <Card className="px-5 py-5">
            <CardHeader>
              {' '}
              <h2 className="mb-5 text-center text-2xl font-bold">
                Kuis Selesai!
              </h2>
              {score > 50 ? (
                <EmojiHunggingFace />
              ) : score === 50 ? (
                <EmojiGrimacing />
              ) : (
                <EmojiSad />
              )}
            </CardHeader>
            <CardContent>
              {/* <p className="mt-2 text-center">
                {' '}
                Anda menjawab dengan benar {correctAnswers} dari{' '}
                {quizData.length} soal.{' '}
              </p> */}
              <h3 className="mt-4 text-center text-xl">Nilai Akhir Anda:</h3>
              {score > 50 ? (
                <h1 className="text-center text-7xl font-bold text-green-500">
                  {score}
                </h1>
              ) : score === 50 ? (
                <h1 className="text-muted-foreground text-center text-7xl font-bold">
                  {score}
                </h1>
              ) : (
                <h1 className="text-center text-7xl font-bold text-red-500">
                  {score}
                </h1>
              )}
              <p className="mt-10">
                Untuk mendapatkan pengalaman yang lebih baik silahkan Login atau
                Register.
              </p>
              <div className="mt-5 flex items-center justify-center gap-6">
                <Button asChild variant="secondary" size="lg">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // --- KONDISI 4: TAMPILAN KUIS SEDANG BERJALAN ---
  return (
    <div>
      <Navbar />
      <div className="motion-preset-expand mt-20 flex w-full flex-col items-center justify-center p-5">
        <div className="motion-preset-fade mb-5 w-full max-w-4xl">
          <p className="text-center text-lg font-semibold">
            {' '}
            Soal {currentQuestionIndex + 1} dari {quizData.length}{' '}
          </p>
          <Progress value={progressPercentage} className="mt-2" />
        </div>

        {/* Render Soal Berdasarkan Tipe */}
        <div className="w-full max-w-4xl">
          {currentQuestion.type === 'multiple-choice' && (
            <div className="mt-5 flex w-full flex-col items-center">
              {' '}
              <Card className="w-full max-w-2xl">
                {' '}
                <CardHeader>
                  {' '}
                  <CardTitle className="text-center text-xl">
                    {' '}
                    {currentQuestion.questionText}{' '}
                  </CardTitle>{' '}
                </CardHeader>{' '}
                <CardContent className="flex justify-center p-4">
                  {' '}
                  <img
                    src={currentQuestion.image}
                    alt="Aksara Batak"
                    className="h-48 w-48 rounded-md md:h-64 md:w-64"
                  />{' '}
                </CardContent>{' '}
                <div className="mr-3 flex justify-end px-3">
                  <Button
                    onClick={() => playAudio()}
                    variant={'circle-default'}
                    size={'icon'}
                    className="size-12" // Menentukan ukuran container tombol
                  >
                    <Volume2 />
                  </Button>
                </div>
              </Card>{' '}
              <div className="mt-6 grid w-full max-w-2xl grid-cols-2 gap-4 md:grid-cols-4">
                {' '}
                {currentQuestion.options?.map((option) => (
                  <Button
                    key={option}
                    onClick={() => handleOptionClick(option)}
                    disabled={isAnswered}
                    variant={
                      isAnswered && option === currentQuestion.correctAnswer
                        ? 'default'
                        : 'secondary'
                    }
                  >
                    {' '}
                    {option}{' '}
                  </Button>
                ))}{' '}
              </div>{' '}
            </div>
          )}
          {currentQuestion.type === 'writing' && (
            <div className="mt-5 flex w-full flex-col items-center">
              {' '}
              <Card className="inline-block w-auto">
                {' '}
                <CardHeader>
                  {' '}
                  <CardTitle className="text-center text-xl">
                    {' '}
                    {currentQuestion.questionText}{' '}
                  </CardTitle>{' '}
                </CardHeader>{' '}
                <CardContent className="p-4">
                  {' '}
                  <div className="flex flex-col items-center gap-5 md:flex-row">
                    {' '}
                    <img
                      src={currentQuestion.image}
                      alt={`Karakter referensi`}
                      className="max-h-[500px] max-w-[500px] rounded-md border border-solid"
                    />{' '}
                    <WritingCanvas
                      ref={canvasRef}
                      imageUrl={currentQuestion.image}
                    />{' '}
                  </div>{' '}
                </CardContent>{' '}
              </Card>{' '}
              <div className="mt-5">
                <Button
                  onClick={handleCheckWritingAnswer}
                  disabled={isAnswered}
                >
                  {' '}
                  Submit{' '}
                </Button>{' '}
              </div>
            </div>
          )}
        </div>

        {/* Dialog Notifikasi Benar/Salah */}
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              {' '}
              <AlertDialogTitle>{feedback}</AlertDialogTitle>{' '}
            </AlertDialogHeader>
            <AlertDialogFooter>
              {' '}
              <AlertDialogAction onClick={handleNextQuestion}>
                {' '}
                <ArrowBigRightDash className="ml-2" />{' '}
              </AlertDialogAction>{' '}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default Mulai;

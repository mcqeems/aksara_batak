import { useRef, useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import WritingCanvas, {
  type CanvasHandle,
} from '@/components/utils/WritingCanvas';
import resemble from 'resemblejs';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ArrowBigRightDash } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import Fail from '@/components/icon/Fail';
import Success from '@/components/icon/Success';
// 1. Definisikan data kuis
const quizData = [
  { id: 1, character: 'あ', image: '/assets/hurufaksara/a.png' },
  { id: 2, character: 'い', image: '/assets/hurufaksara/a.png' }, // Ganti dengan gambar 'i'
  { id: 3, character: 'う', image: '/assets/hurufaksara/a.png' }, // Ganti dengan gambar 'u'
  { id: 4, character: 'え', image: '/assets/hurufaksara/a.png' }, // Ganti dengan gambar 'e'
  { id: 5, character: 'お', image: '/assets/hurufaksara/a.png' }, // Ganti dengan gambar 'o'
];
// Note: Untuk sementara, Anda bisa gunakan gambar yang sama untuk semua soal.

function Mulai() {
  const canvasRef = useRef<CanvasHandle>(null);

  // 2. State untuk mengelola kuis
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [results, setResults] = useState<boolean[]>([]); // Menyimpan hasil [true, false, ...]
  const [isAnswered, setIsAnswered] = useState(false); // Apakah soal ini sudah dijawab?
  const [quizFinished, setQuizFinished] = useState(false); // Apakah kuis selesai?
  const [feedback, setFeedback] = useState<React.ReactNode>(''); // Pesan umpan balik untuk user
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const currentQuestion = quizData[currentQuestionIndex];

  // 3. Fungsi untuk mengecek jawaban
  const handleCheckAnswer = () => {
    if (!canvasRef.current) return;
    const stage = canvasRef.current.getStage();
    if (!stage) return;

    const userImage = stage.toDataURL();

    resemble(userImage)
      .compareTo(currentQuestion.image)
      .onComplete((data) => {
        const isCorrect = data.misMatchPercentage < 6; // Anda bisa sesuaikan ambang batas ini

        setFeedback(
          isCorrect ? (
            <div className="flex flex-col items-center justify-center">
              <Success />{' '}
              <p className="text-center text-xl font-bold text-green-400">
                Benar!
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <Fail />{' '}
              <p className="text-center text-xl font-bold text-red-400">
                Salah!
              </p>
            </div>
          )
        );
        setResults((prev) => [...prev, isCorrect]); // Simpan hasil
        setIsAnswered(true); // Tandai sudah dijawab
        setIsAnswered(true); // Disable the check button after answering
        setIsDialogOpen(true); // Open the dialog
      });
  };

  // 4. Fungsi untuk lanjut ke soal berikutnya
  const handleNextQuestion = () => {
    setFeedback('');
    setIsAnswered(false);
    canvasRef.current?.reset();
    setIsAnswered(false); // Re-enable check button for the next question

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < quizData.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setQuizFinished(true);
    }
  };

  const progressPercentage = (results.length / quizData.length) * 100;

  // 5. Tampilan Halaman Skor
  if (quizFinished) {
    const correctAnswers = results.filter((result) => result === true).length;
    const score = Math.round((correctAnswers / quizData.length) * 100);

    return (
      <div>
        <Navbar />
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h2>Kuis Selesai!</h2>
          <p>
            Anda menjawab dengan benar {correctAnswers} dari {quizData.length}{' '}
            soal.
          </p>
          <h3>Nilai Akhir Anda:</h3>
          <h1 style={{ fontSize: '4rem', color: '#4CAF50' }}>{score}</h1>
        </div>
      </div>
    );
  }

  // 6. Tampilan Halaman Kuis
  return (
    <div>
      <Navbar />
      <div className="mt-15 flex w-full flex-col items-center justify-center p-5">
        <div className="mb-5">
          <p>Tuliskan karakter ini!</p>
        </div>
        <div>
          <div className="flex flex-col gap-5 md:flex-row">
            <img
              src={currentQuestion.image}
              alt={`Karakter ${currentQuestion.character}`}
              className="text-primary max-h-[500px] max-w-[500px] border border-solid"
            />
            <WritingCanvas ref={canvasRef} />
          </div>
          <div className="mt-5">
            <Progress value={progressPercentage} />
          </div>
        </div>

        <div className="mt-5">
          <Button
            onClick={handleCheckAnswer}
            disabled={isAnswered}
            className="ml-3"
          >
            Submit
          </Button>
          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{feedback}</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                {/* This action button will close the dialog and move to the next question */}
                <AlertDialogAction onClick={handleNextQuestion}>
                  <ArrowBigRightDash />
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
export default Mulai;

import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

function Learn() {
  return (
    <div className="w-full px-2 py-2 md:px-4 md:py-8">
      <div className="mx-auto w-full max-w-5xl">
        {/* Judul Halaman */}
        <div className="bg-sidebar-border rounded-2xl border p-6">
          <h1 className="font-sora text-primary text-center text-2xl font-bold md:text-3xl">
            Apa yang ingin anda pelajari hari ini?
          </h1>
        </div>
        <div className="my-5 grid grid-cols-2 gap-5">
          <Link to="/learn/aksara">
            <Card className="hover:shadow-primary p-5 transition ease-linear hover:opacity-85">
              <CardContent>
                <img
                  className="h-full max-h-[300px] w-full max-w-[300px] self-center justify-self-center rounded-3xl"
                  src="/assets/hurufaksara/konsonan/wa.png"
                ></img>
              </CardContent>
              <CardTitle className="text-center">Aksara Batak</CardTitle>
            </Card>
          </Link>

          <Link to="/learn/toba">
            <Card className="hover:shadow-primary p-5 transition ease-linear hover:opacity-85">
              <CardContent>
                <img
                  className="h-full max-h-[300px] w-full max-w-[300px] self-center justify-self-center rounded-3xl"
                  src="/assets/foto-lain/suku-batak.png"
                ></img>
              </CardContent>
              <CardTitle className="text-center">Batak Toba</CardTitle>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Learn;

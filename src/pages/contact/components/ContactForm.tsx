import { motion } from 'framer-motion';
import { Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface ContactFormProps {
  formData: {
    name: string;
    email: string;
    message: string;
  };
  onFormChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function ContactForm({
  formData,
  onFormChange,
  onSubmit,
}: ContactFormProps) {
  return (
    <Card className="bg-background/50 border-0 shadow-lg backdrop-blur-sm">
      <CardHeader className="pb-3 text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-xl font-bold">
          <MessageCircle className="text-primary h-5 w-5" />
          Kirim Pesan
        </CardTitle>
        <CardDescription className="text-sm">
          Isi formulir di bawah ini dan kami akan segera menghubungi Anda
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Label htmlFor="name" className="text-sm font-medium">
                Nama Lengkap
              </Label>
              <Input
                id="name"
                placeholder="Tulis nama Anda"
                value={formData.name}
                onChange={onFormChange}
                required
                className="h-10 text-sm"
              />
            </motion.div>
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Label htmlFor="email" className="text-sm font-medium">
                Alamat Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="email@contoh.com"
                value={formData.email}
                onChange={onFormChange}
                required
                className="h-10 text-sm"
              />
            </motion.div>
          </div>
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Label htmlFor="message" className="text-sm font-medium">
              Pesan Anda
            </Label>
            <Textarea
              id="message"
              placeholder="Apa yang ingin Anda sampaikan? Beritahu kami tentang pertanyaan, saran, atau kolaborasi yang Anda inginkan."
              rows={5}
              value={formData.message}
              onChange={onFormChange}
              required
              className="resize-none text-sm"
            />
          </motion.div>
          <motion.div
            className="pt-2 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <Button
              type="submit"
              size="lg"
              className="h-11 px-6 text-base font-semibold"
            >
              <Send className="mr-2 h-4 w-4" />
              Kirim Pesan
            </Button>
          </motion.div>
        </form>
      </CardContent>
    </Card>
  );
}

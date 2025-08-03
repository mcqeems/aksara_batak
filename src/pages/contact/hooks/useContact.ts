import { useState, type ChangeEvent, type FormEvent } from 'react';
import api from '@/services/api';

export function useContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<string>();
  const [statusLoading, setStatusLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formData.message.length < 10) {
      setStatus('Pesan harus lebih dari 10 karakter');
      return;
    }

    setStatusLoading(true);
    setStatus(undefined);

    try {
      const response = await api.post('/v1/contact-us', formData);
      setStatus(response.data.data);
      setFormData({ name: '', email: '', message: '' }); // Reset form on success
    } catch (error) {
      setStatus('Pesan gagal dikirim. Silakan coba lagi.');
      console.error('Pesan gagal dikirim: ', error);
    } finally {
      setStatusLoading(false);
    }
  };

  return {
    formData,
    status,
    statusLoading,
    handleChange,
    handleSubmit,
  };
}

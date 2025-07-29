import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SendHorizonal } from 'lucide-react';
import api from '@/services/api';
import TypingLoader from '@/components/ui/loader/TypingLoader';

interface Message {
  text: string;
  isUser: boolean;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (inputValue.trim() && !isLoading) {
      const userMessage = { text: inputValue, isUser: true };
      const currentInputValue = inputValue;
      setMessages((prev) => [...prev, userMessage]);
      setInputValue('');
      setIsLoading(true);

      // Add a placeholder for the loader
      setMessages((prev) => [...prev, { text: '', isUser: false }]);

      try {
        const response = await api.post('/v1/chat/private', {
          message: currentInputValue,
        });

        const aiResponse = response.data?.data?.reply;

        if (typeof aiResponse === 'string' && aiResponse) {
          const words = aiResponse.split(/(\s+)/);
          let streamedText = '';

          words.forEach((word: string, index: number) => {
            setTimeout(() => {
              streamedText += word;
              setMessages((prev) => {
                const newMessages = [...prev];
                if (newMessages.length > 0) {
                  newMessages[newMessages.length - 1].text = streamedText;
                }
                return newMessages;
              });
            }, index * 50);
          });
        } else {
          console.error('Invalid API response structure:', response.data);
          setMessages((prev) => {
            const newMessages = [...prev];
            if (newMessages.length > 0) {
              newMessages[newMessages.length - 1].text =
                'Maaf, respons dari server tidak valid.';
            }
            return newMessages;
          });
        }
      } catch (error) {
        console.error('Response fetch failed:', error);
        setMessages((prev) => {
          const newMessages = [...prev];
          if (newMessages.length > 0) {
            newMessages[newMessages.length - 1].text =
              'Maaf, terjadi kesalahan saat mengambil respons.';
          }
          return newMessages;
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      <div
        ref={chatContainerRef}
        className="flex-1 space-y-4 overflow-y-auto p-4"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.isUser ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-lg rounded-2xl px-4 py-2 md:max-w-3xl ${
                message.isUser
                  ? 'bg-muted-foreground/50 text-primary'
                  : 'text-primary'
              }`}
            >
              {isLoading && !message.isUser && index === messages.length - 1 ? (
                <TypingLoader />
              ) : (
                message.text
              )}
            </div>
          </div>
        ))}
      </div>
      {messages ? (
        <div className="flex items-center border-t p-4">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ketik pesan Anda..."
            className="mr-4 flex-1"
          />
          <Button onClick={handleSendMessage}>
            <SendHorizonal className="h-5 w-5" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center border-t p-4">
          <Input
            value={inputValue}
            placeholder="Ketik pesan Anda..."
            disabled
            className="mr-4 flex-1"
          />
          <Button disabled>
            <SendHorizonal className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Chat;

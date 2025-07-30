import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SendHorizonal, ClipboardCopy, Check } from 'lucide-react';
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
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [historyValue, setHistoryValue] = useState(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000); // Reset after 2 seconds
    });
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() && !isLoading) {
      const userMessage = { text: inputValue, isUser: true };
      const currentInputValue = inputValue;
      setMessages((prev) => [...prev, userMessage]);
      setInputValue('');
      setIsLoading(true);

      setMessages((prev) => [...prev, { text: '', isUser: false }]);

      try {
        const response = await api.post('/v1/chat/private', {
          message:
            currentInputValue + 'Ini adalah memori anda: ' + historyValue,
        });
        const aiHistoryResponse = response.data?.data?.history.map(
          (item: { reply: string }) => item.reply
        );
        setHistoryValue(aiHistoryResponse);
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
            }, index * 15);
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
        className="mx-auto w-full max-w-4xl flex-1 space-y-6 overflow-y-auto md:p-4"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`group relative flex items-start gap-x-3 ${
              message.isUser ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xl rounded-2xl px-4 py-2 md:max-w-2xl lg:max-w-4xl ${
                message.isUser
                  ? 'dark:bg-muted-foreground/50 dark:text-primary bg-muted text-accent motion-preset-focus'
                  : 'text-primary'
              }`}
            >
              {isLoading && !message.isUser && index === messages.length - 1 ? (
                <TypingLoader />
              ) : (
                <p className="break-words">{message.text}</p>
              )}
            </div>
            {!message.isUser && message.text && !isLoading && (
              <div className="absolute -bottom-8 left-2 flex items-center space-x-1 opacity-0 transition-opacity group-hover:opacity-100">
                <Button
                  variant="link"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => handleCopy(message.text, index)}
                >
                  {copiedIndex === index ? (
                    <Check className="h-4 w-4 text-green-700 dark:text-green-500" />
                  ) : (
                    <ClipboardCopy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mx-auto w-full max-w-4xl border-t p-4">
        <div className="motion-preset-expand flex items-center">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ketik pesan Anda..."
            disabled={isLoading}
            className="mr-4 flex-1 py-5 transition-all duration-300 disabled:opacity-50"
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading}
            className="transition-opacity duration-300 disabled:opacity-50"
          >
            <SendHorizonal className="text-muted h-5 w-5" />
          </Button>
        </div>
        <p className="text-muted-foreground motion-preset-fade motion-delay-100 pt-2 text-center text-xs">
          AI mungkin melakukan kesalahan, silahkan mengecek kembali jawabannya.
        </p>
      </div>
    </div>
  );
};

export default Chat;

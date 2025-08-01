import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  SendHorizonal,
  ClipboardCopy,
  Check,
  Bot,
  User,
  Lightbulb,
  BookOpen,
  Languages,
  History,
} from 'lucide-react';
import TypingLoader from '@/components/ui/loader/TypingLoader';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export function ChatbotContent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Halo! Saya adalah AI asisten yang siap membantu Anda belajar tentang Aksara Batak. Apa yang ingin Anda tanyakan?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() && !isLoading) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: inputValue,
        isUser: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setInputValue('');
      setIsLoading(true);

      // Add AI response placeholder
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: '',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);

      // Simulate AI response (replace with actual API call)
      setTimeout(() => {
        const responses = [
          'Terima kasih atas pertanyaannya! Saya akan membantu Anda memahami Aksara Batak dengan lebih baik.',
          'Pertanyaan yang sangat menarik! Mari kita bahas bersama tentang Aksara Batak.',
          'Saya senang Anda tertarik dengan Aksara Batak. Berikut adalah penjelasannya...',
          'Aksara Batak adalah sistem tulisan tradisional yang sangat menarik untuk dipelajari.',
          'Mari kita eksplorasi lebih dalam tentang budaya dan sejarah Aksara Batak.',
        ];
        const randomResponse =
          responses[Math.floor(Math.random() * responses.length)];

        setMessages((prev) => {
          const newMessages = [...prev];
          if (newMessages.length > 0) {
            newMessages[newMessages.length - 1].text = randomResponse;
          }
          return newMessages;
        });
        setIsLoading(false);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <motion.div
      className="bg-card/50 border-border/50 w-full max-w-4xl rounded-2xl border p-6 shadow-xl backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-primary/20 flex h-12 w-12 items-center justify-center rounded-full">
            <Bot className="text-primary h-6 w-6" />
          </div>
          <div>
            <h1 className="text-foreground text-xl font-semibold">
              AI Asisten Aksara Batak
            </h1>
            <p className="text-muted-foreground text-sm">
              Siap membantu Anda belajar
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="flex items-center space-x-1">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span>Online</span>
          </Badge>
        </div>
      </div>

      {/* Chat Container */}
      <div className="bg-muted/20 mb-4 h-96 overflow-y-auto rounded-lg border p-4">
        <div ref={chatContainerRef} className="space-y-4">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              className={`group flex items-start gap-x-3 ${
                message.isUser ? 'justify-end' : 'justify-start'
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {!message.isUser && (
                <div className="bg-primary/20 flex h-8 w-8 items-center justify-center rounded-full">
                  <Bot className="text-primary h-4 w-4" />
                </div>
              )}

              <div className="flex max-w-xs flex-col space-y-1 md:max-w-md lg:max-w-lg">
                <div
                  className={`rounded-2xl px-4 py-2 ${
                    message.isUser
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card text-foreground border'
                  }`}
                >
                  {isLoading &&
                  !message.isUser &&
                  index === messages.length - 1 ? (
                    <TypingLoader />
                  ) : (
                    <p className="text-sm break-words">{message.text}</p>
                  )}
                </div>

                <div
                  className={`text-muted-foreground flex items-center space-x-2 text-xs ${
                    message.isUser ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <span>{formatTime(message.timestamp)}</span>
                  {!message.isUser && message.text && !isLoading && (
                    <Button
                      variant="link"
                      size="icon"
                      className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                      onClick={() => handleCopy(message.text, index)}
                    >
                      {copiedIndex === index ? (
                        <Check className="h-3 w-3 text-green-600" />
                      ) : (
                        <ClipboardCopy className="h-3 w-3" />
                      )}
                    </Button>
                  )}
                </div>
              </div>

              {message.isUser && (
                <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-full">
                  <User className="text-muted-foreground h-4 w-4" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-4 flex flex-wrap gap-2">
        <Button
          variant="secondary"
          size="sm"
          className="flex items-center space-x-2"
          onClick={() => setInputValue('Apa itu Aksara Batak?')}
        >
          <BookOpen className="h-3 w-3" />
          <span>Apa itu Aksara Batak?</span>
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="flex items-center space-x-2"
          onClick={() => setInputValue('Bagaimana cara menulis Aksara Batak?')}
        >
          <Languages className="h-3 w-3" />
          <span>Cara Menulis</span>
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="flex items-center space-x-2"
          onClick={() => setInputValue('Sejarah Aksara Batak')}
        >
          <History className="h-3 w-3" />
          <span>Sejarah</span>
        </Button>
      </div>

      {/* Input Area */}
      <div className="flex items-center space-x-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ketik pesan Anda..."
          disabled={isLoading}
          className="flex-1"
        />
        <Button
          onClick={handleSendMessage}
          disabled={isLoading || !inputValue.trim()}
          className="flex items-center space-x-2"
        >
          <SendHorizonal className="h-4 w-4" />
          <span className="hidden sm:inline">Kirim</span>
        </Button>
      </div>

      {/* Footer Info */}
      <div className="text-muted-foreground mt-4 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-4">
          <span>
            AI mungkin melakukan kesalahan, silakan cek kembali jawabannya
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Lightbulb className="h-3 w-3" />
          <span>Powered by AI</span>
        </div>
      </div>
    </motion.div>
  );
}

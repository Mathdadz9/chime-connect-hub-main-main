
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Search, Paperclip, Smile, Send } from 'lucide-react';

const Messages = () => {
  const [message, setMessage] = useState('');

  // Dados simulados de conversas
  const conversations = [
    {
      id: '1',
      name: 'Ana Martins',
      avatar: null,
      lastMessage: 'Oi! Como você está?',
      time: '5 min',
      unread: 2,
      online: true,
    },
    {
      id: '2',
      name: 'Carlos Silva',
      avatar: null,
      lastMessage: 'Vamos jogar mais tarde?',
      time: '30 min',
      unread: 0,
      online: true,
    },
    {
      id: '3',
      name: 'Pedro Costa',
      avatar: null,
      lastMessage: 'Obrigado pelo convite!',
      time: '3 horas',
      unread: 0,
      online: true,
    },
    {
      id: '4',
      name: 'João Lima',
      avatar: null,
      lastMessage: 'Vi sua última transmissão, muito legal!',
      time: '1 dia',
      unread: 0,
      online: false,
    },
  ];

  // Mensagens simuladas da conversa atual
  const currentChat = [
    {
      id: 1,
      sender: 'Ana Martins',
      content: 'Oi! Como você está?',
      time: '10:30',
      isMe: false,
    },
    {
      id: 2,
      sender: 'Você',
      content: 'Estou bem! E você?',
      time: '10:31',
      isMe: true,
    },
    {
      id: 3,
      sender: 'Ana Martins',
      content: 'Tudo ótimo! Viu a nova atualização da plataforma?',
      time: '10:32',
      isMe: false,
    },
    {
      id: 4,
      sender: 'Você',
      content:
        'Sim, achei muito interessante as novas funcionalidades de transmissão ao vivo!',
      time: '10:33',
      isMe: true,
    },
    {
      id: 5,
      sender: 'Ana Martins',
      content:
        'Concordo! Podemos testar juntos mais tarde? Quero ver como funciona a parte de compartilhamento de tela.',
      time: '10:34',
      isMe: false,
    },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() !== '') {
      // Aqui seria a lógica para enviar a mensagem
      console.log('Mensagem enviada:', message);
      setMessage('');
    }
  };

  return (
    <MainLayout>
      <div className="flex h-[calc(100vh-3.5rem)]">
        {/* Lista de conversas */}
        <div className="w-64 border-r border-border bg-card/30 overflow-y-auto hidden md:block">
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar conversa"
                className="pl-8 bg-muted/50"
              />
            </div>
          </div>

          <div className="py-2">
            {conversations.map((convo) => (
              <div
                key={convo.id}
                className={`flex items-center gap-3 p-2 mx-1 rounded-md cursor-pointer ${
                  convo.id === '1' ? 'bg-muted' : 'hover:bg-muted/70'
                }`}
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center text-xs">
                    {convo.name.substring(0, 1)}
                  </div>
                  {convo.online && (
                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <p className="font-medium text-sm truncate">
                      {convo.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{convo.time}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-xs text-muted-foreground truncate">
                      {convo.lastMessage}
                    </p>
                    {convo.unread > 0 && (
                      <span className="inline-flex items-center justify-center h-4 w-4 text-[10px] bg-primary rounded-full">
                        {convo.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Área da conversa */}
        <div className="flex-1 flex flex-col">
          {/* Cabeçalho da conversa */}
          <div className="h-14 border-b border-border flex items-center px-4 justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-secondary-foreground/10 flex items-center justify-center text-xs">
                  A
                </div>
                <div className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 border-2 border-background" />
              </div>
              <div>
                <h3 className="font-medium text-sm">Ana Martins</h3>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
            </div>

            <div className="flex gap-1">
              <Button variant="ghost" size="icon">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Mensagens */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {currentChat.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.isMe ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[70%] ${
                    msg.isMe
                      ? 'bg-primary text-primary-foreground rounded-t-lg rounded-bl-lg'
                      : 'bg-muted rounded-t-lg rounded-br-lg'
                  } p-3`}
                >
                  {!msg.isMe && (
                    <p className="text-xs font-medium mb-1">{msg.sender}</p>
                  )}
                  <p className="text-sm">{msg.content}</p>
                  <p
                    className={`text-[10px] mt-1 text-right ${
                      msg.isMe ? 'text-primary-foreground/80' : 'text-muted-foreground'
                    }`}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Área de digitação */}
          <div className="border-t border-border p-3">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <Button type="button" variant="ghost" size="icon">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input
                placeholder="Digite sua mensagem..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 bg-muted/50"
              />
              <Button type="button" variant="ghost" size="icon">
                <Smile className="h-4 w-4" />
              </Button>
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Messages;


import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, Monitor, Video, Mic, Users } from 'lucide-react';

const Streams = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Dados simulados
  const liveStreams = [
    {
      id: '1',
      title: 'Jogando Valorant com amigos',
      host: 'Carlos Silva',
      viewers: 24,
      thumbnail: null,
      tags: ['Jogos', 'FPS'],
    },
    {
      id: '2',
      title: 'Programação em React: Criando um chat em tempo real',
      host: 'Ana Martins',
      viewers: 15,
      thumbnail: null,
      tags: ['Programação', 'React'],
    },
    {
      id: '3',
      title: 'Bate-papo sobre tecnologias emergentes',
      host: 'Pedro Costa',
      viewers: 32,
      thumbnail: null,
      tags: ['Tecnologia', 'Discussão'],
    },
  ];

  const upcomingStreams = [
    {
      id: '4',
      title: 'Workshop: Introdução ao WebRTC',
      host: 'Maria Santos',
      scheduledFor: 'Amanhã, 19:00',
      thumbnail: null,
      tags: ['Tutorial', 'WebRTC'],
    },
    {
      id: '5',
      title: 'Torneio de League of Legends',
      host: 'Bruno Oliveira',
      scheduledFor: 'Sábado, 15:00',
      thumbnail: null,
      tags: ['Jogos', 'Torneio'],
    },
  ];

  return (
    <MainLayout>
      <div className="p-6 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Transmissões</h1>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar transmissões"
                className="pl-8 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button>Iniciar Transmissão</Button>
          </div>
        </div>

        {/* Card destacado para iniciar transmissão */}
        <Card className="border-primary/30 bg-primary/5 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-1/3 flex-shrink-0">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <Video className="h-12 w-12 text-muted-foreground/50" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-2">
                  Inicie sua transmissão
                </h2>
                <p className="text-muted-foreground mb-4">
                  Compartilhe sua tela, câmera ou microfone com seus amigos e seguidores.
                  Crie canais temáticos para jogos, programação, bate-papo e muito mais.
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-md p-3 bg-card border border-border flex flex-col items-center gap-2 hover:border-primary transition-colors cursor-pointer">
                    <Monitor className="h-6 w-6 text-muted-foreground" />
                    <span className="text-sm">Tela</span>
                  </div>
                  <div className="rounded-md p-3 bg-card border border-border flex flex-col items-center gap-2 hover:border-primary transition-colors cursor-pointer">
                    <Video className="h-6 w-6 text-muted-foreground" />
                    <span className="text-sm">Câmera</span>
                  </div>
                  <div className="rounded-md p-3 bg-card border border-border flex flex-col items-center gap-2 hover:border-primary transition-colors cursor-pointer">
                    <Mic className="h-6 w-6 text-muted-foreground" />
                    <span className="text-sm">Áudio</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="px-6 py-4 bg-card/30 flex justify-end">
            <Button>Configurar Transmissão</Button>
          </CardFooter>
        </Card>

        <Tabs defaultValue="live">
          <TabsList className="w-full justify-start mb-6 bg-muted/50">
            <TabsTrigger value="live" className="flex gap-2 items-center">
              <span className="h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
              Ao Vivo
            </TabsTrigger>
            <TabsTrigger value="upcoming">Agendadas</TabsTrigger>
            <TabsTrigger value="discover">Descobrir</TabsTrigger>
          </TabsList>

          {/* Aba Ao Vivo */}
          <TabsContent value="live" className="space-y-4">
            {liveStreams.length === 0 ? (
              <div className="text-center py-10">
                <h3 className="font-semibold text-lg">
                  Nenhuma transmissão ao vivo
                </h3>
                <p className="text-muted-foreground">
                  As transmissões ao vivo aparecerão aqui.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {liveStreams.map((stream) => (
                  <div
                    key={stream.id}
                    className="rounded-lg border border-border overflow-hidden group"
                  >
                    <div className="aspect-video bg-muted relative group-hover:opacity-90 transition-opacity">
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <span className="h-2 w-2 bg-white rounded-full animate-pulse"></span>
                        AO VIVO
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <Users size={12} />
                        {stream.viewers}
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium truncate mb-1">{stream.title}</h3>
                      <p className="text-sm text-muted-foreground">{stream.host}</p>
                      <div className="flex gap-2 mt-2">
                        {stream.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-card p-3 border-t border-border">
                      <Button className="w-full" variant="outline">
                        Assistir
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Aba Agendadas */}
          <TabsContent value="upcoming" className="space-y-4">
            {upcomingStreams.length === 0 ? (
              <div className="text-center py-10">
                <h3 className="font-semibold text-lg">
                  Nenhuma transmissão agendada
                </h3>
                <p className="text-muted-foreground">
                  As transmissões agendadas aparecerão aqui.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {upcomingStreams.map((stream) => (
                  <div
                    key={stream.id}
                    className="flex rounded-lg border border-border overflow-hidden group"
                  >
                    <div className="w-1/3 bg-muted relative group-hover:opacity-90 transition-opacity"></div>
                    <div className="w-2/3 p-4">
                      <h3 className="font-medium mb-1">{stream.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {stream.host}
                      </p>
                      <p className="text-xs bg-secondary px-2 py-1 rounded-full inline-block">
                        {stream.scheduledFor}
                      </p>
                      <div className="flex gap-2 mt-3">
                        {stream.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="mt-3 flex justify-end">
                        <Button variant="outline" size="sm">
                          Lembrar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Aba Descobrir */}
          <TabsContent value="discover" className="space-y-4">
            <div className="text-center py-10">
              <h3 className="font-semibold text-lg">
                Explore novas transmissões
              </h3>
              <p className="text-muted-foreground mb-4">
                Descubra transmissões populares de toda a plataforma.
              </p>
              <Button>Explorar Categorias</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Streams;

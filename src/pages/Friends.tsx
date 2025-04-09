
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, MessageCircle, Video, UserPlus, X, Check } from 'lucide-react';

const Friends = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Dados simulados
  const onlineFriends = [
    { id: '1', name: 'Ana Martins', status: 'Jogando Valorant' },
    { id: '2', name: 'Carlos Silva', status: 'Disponível' },
    { id: '3', name: 'Pedro Costa', status: 'Ocupado' },
  ];

  const allFriends = [
    ...onlineFriends,
    { id: '4', name: 'João Lima', status: 'Offline' },
    { id: '5', name: 'Maria Santos', status: 'Offline' },
    { id: '6', name: 'Bruno Oliveira', status: 'Offline' },
  ];

  const pendingRequests = [
    { id: '7', name: 'Luiza Ferreira', since: '2 dias atrás' },
    { id: '8', name: 'Gabriel Almeida', since: '1 semana atrás' },
  ];

  // Dados simulados de resultados de busca
  const searchResults = [
    { id: '9', name: 'Fernanda Lima', mutualFriends: 3 },
    { id: '10', name: 'Ricardo Torres', mutualFriends: 1 },
  ];

  return (
    <MainLayout>
      <div className="p-6 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Amigos</h1>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar amigos"
                className="pl-8 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Adicionar Amigo
            </Button>
          </div>
        </div>

        <Tabs defaultValue="online">
          <TabsList className="w-full justify-start mb-6 bg-muted/50">
            <TabsTrigger value="online" className="flex gap-2 items-center">
              <span className="h-2 w-2 bg-green-500 rounded-full"></span>
              Online
            </TabsTrigger>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="pending">
              Solicitações
              <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                {pendingRequests.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="add">Adicionar</TabsTrigger>
          </TabsList>

          {/* Aba Online */}
          <TabsContent value="online" className="space-y-4">
            {onlineFriends.length === 0 ? (
              <div className="text-center py-10">
                <h3 className="font-semibold text-lg">Nenhum amigo online</h3>
                <p className="text-muted-foreground">
                  Seus amigos aparecerão aqui quando estiverem online.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {onlineFriends.map((friend) => (
                  <div
                    key={friend.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-card border border-border/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center text-sm">
                          {friend.name.substring(0, 1)}
                        </div>
                        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-card" />
                      </div>
                      <div>
                        <h3 className="font-medium">{friend.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {friend.status}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Video className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Aba Todos */}
          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {allFriends.map((friend) => (
                <div
                  key={friend.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-card border border-border/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center text-sm">
                        {friend.name.substring(0, 1)}
                      </div>
                      {friend.status !== 'Offline' && (
                        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-card" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{friend.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {friend.status}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      disabled={friend.status === 'Offline'}
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      disabled={friend.status === 'Offline'}
                    >
                      <Video className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Aba Solicitações Pendentes */}
          <TabsContent value="pending" className="space-y-4">
            {pendingRequests.length === 0 ? (
              <div className="text-center py-10">
                <h3 className="font-semibold text-lg">
                  Nenhuma solicitação pendente
                </h3>
                <p className="text-muted-foreground">
                  As solicitações de amizade aparecerão aqui.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {pendingRequests.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-card border border-border/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center text-sm">
                        {request.name.substring(0, 1)}
                      </div>
                      <div>
                        <h3 className="font-medium">{request.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          Enviada {request.since}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="h-8">
                        <X className="h-4 w-4 mr-2" />
                        Recusar
                      </Button>
                      <Button size="sm" className="h-8">
                        <Check className="h-4 w-4 mr-2" />
                        Aceitar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Aba Adicionar */}
          <TabsContent value="add" className="space-y-6">
            <div className="max-w-lg mx-auto">
              <div className="flex mb-6">
                <Input
                  placeholder="Procurar por nome ou email"
                  className="rounded-r-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button className="rounded-l-none">Buscar</Button>
              </div>

              {searchQuery ? (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold mb-2">
                    Resultados da busca
                  </h3>
                  {searchResults.map((result) => (
                    <div
                      key={result.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-card border border-border/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center text-sm">
                          {result.name.substring(0, 1)}
                        </div>
                        <div>
                          <h3 className="font-medium">{result.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            {result.mutualFriends} amigos em comum
                          </p>
                        </div>
                      </div>
                      <Button size="sm">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Adicionar
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <h3 className="font-semibold text-lg">
                    Encontre seus amigos
                  </h3>
                  <p className="text-muted-foreground">
                    Pesquise por nomes ou emails para adicionar novos amigos à
                    sua lista.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Friends;

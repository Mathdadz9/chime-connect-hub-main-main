import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Video, Users, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // ✅ Importação adicionada

const Dashboard = () => {
  const navigate = useNavigate(); // ✅ Hook para navegação

  const stats = [
    {
      title: 'Mensagens',
      value: '128',
      icon: MessageCircle,
      description: 'Mensagens enviadas hoje',
    },
    {
      title: 'Transmissões',
      value: '3',
      icon: Video,
      description: 'Transmissões ao vivo',
    },
    {
      title: 'Amigos',
      value: '24',
      icon: Users,
      description: 'Amigos online',
    },
    {
      title: 'Tempo',
      value: '5.2h',
      icon: Clock,
      description: 'Tempo na plataforma',
    },
  ];

  const events = [
    {
      title: 'Transmissão: Nova atualização de jogos',
      time: 'Hoje, 19:00',
      host: 'Pedro Costa',
    },
    {
      title: 'Bate-papo sobre tecnologias web',
      time: 'Amanhã, 20:30',
      host: 'Ana Martins',
    },
    {
      title: 'Jogando com a comunidade',
      time: 'Sexta, 21:00',
      host: 'Carlos Silva',
    },
  ];

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Bem-vindo de volta, Usuário Conectado!
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">Gerenciar Perfil</Button>
            {/* ✅ Botão atualizado com ação de navegação */}
            <Button
              onClick={() => navigate('/transmissao')}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Iniciar Transmissão
            </Button>
          </div>
        </div>

        {/* Cards de estatísticas */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="border-border/50">
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-base font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Atividades recentes */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Atividades Recentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {[
                  { user: 'Ana Martins', action: 'enviou uma mensagem', time: '5 min atrás' },
                  { user: 'Carlos Silva', action: 'iniciou uma transmissão', time: '30 min atrás' },
                  { user: 'Pedro Costa', action: 'aceitou seu convite de amizade', time: '2 horas atrás' },
                  { user: 'Você', action: 'enviou um convite de amizade para João Lima', time: '3 horas atrás' },
                ].map((activity, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div>
                      <span className="font-medium">{activity.user}</span>{' '}
                      <span className="text-muted-foreground">{activity.action}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="w-full">
                Ver Mais
              </Button>
            </CardContent>
          </Card>

          {/* Próximos eventos */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Próximas Transmissões</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {events.map((event, i) => (
                  <div
                    key={i}
                    className="flex flex-col p-3 rounded-lg bg-muted/40"
                  >
                    <div className="font-medium">{event.title}</div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-sm text-muted-foreground">
                        por {event.host}
                      </span>
                      <span className="text-xs bg-primary/20 text-primary-foreground px-2 py-1 rounded-full">
                        {event.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="w-full">
                Ver Todas as Transmissões
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;

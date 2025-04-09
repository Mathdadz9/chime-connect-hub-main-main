
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validação simples
    if (!email || !password) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (isRegister && password !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Simulação de autenticação - em uma implementação real, isso seria conectado ao Supabase
    setTimeout(() => {
      localStorage.setItem('isAuthenticated', 'true');
      
      toast({
        title: isRegister ? "Conta criada" : "Login bem-sucedido",
        description: isRegister 
          ? "Sua conta foi criada com sucesso! Bem-vindo(a)."
          : "Você foi autenticado com sucesso!",
      });
      
      navigate('/dashboard');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      {/* Logo e título */}
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text mb-2">
          Chime Connect
        </h1>
        <p className="text-muted-foreground">
          Conecte-se. Comunique-se. Colabore.
        </p>
      </div>

      {/* Card de autenticação */}
      <Card className="w-full max-w-md border-border/40 bg-card/90 backdrop-blur-sm animate-fade-in">
        <CardHeader>
          <CardTitle className="text-xl">
            {isRegister ? "Criar uma conta" : "Bem-vindo de volta"}
          </CardTitle>
          <CardDescription>
            {isRegister
              ? "Preencha os dados abaixo para se registrar"
              : "Faça login com sua conta para continuar"}
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {isRegister && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required={isRegister}
                />
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col">
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading
                ? "Processando..."
                : isRegister
                ? "Criar Conta"
                : "Entrar"}
            </Button>

            <Button
              variant="link"
              className="mt-2"
              type="button"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister
                ? "Já tem uma conta? Faça login"
                : "Não tem uma conta? Registre-se"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* Elementos decorativos */}
      <div className="fixed top-[-10%] right-[-5%] w-72 h-72 bg-purple-500/10 rounded-full filter blur-3xl" />
      <div className="fixed bottom-[-10%] left-[-5%] w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl" />
    </div>
  );
};

export default Login;

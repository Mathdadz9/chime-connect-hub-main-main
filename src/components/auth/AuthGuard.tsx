
import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Verificação de autenticação simples
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    if (!isAuthenticated) {
      toast({
        title: "Não autenticado",
        description: "Por favor, faça login para acessar esta página.",
        variant: "destructive",
      });
      navigate('/login');
    }
  }, [navigate, toast]);

  return <>{children}</>;
};

export default AuthGuard;

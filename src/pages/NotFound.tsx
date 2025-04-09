
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center p-6 max-w-md">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">404</h1>
        <p className="text-xl text-foreground mb-4">Oops! Página não encontrada</p>
        <p className="text-muted-foreground mb-6">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Button asChild>
          <Link to="/dashboard">Voltar para o Dashboard</Link>
        </Button>
        
        <div className="mt-10">
          <Link to="/login" className="text-primary hover:underline">
            Voltar para a página de login
          </Link>
        </div>
      </div>
      
      {/* Elementos decorativos */}
      <div className="fixed top-[-10%] right-[-5%] w-72 h-72 bg-purple-500/10 rounded-full filter blur-3xl" />
      <div className="fixed bottom-[-10%] left-[-5%] w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl" />
    </div>
  );
};

export default NotFound;

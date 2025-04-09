import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Messages from "./pages/Messages";
import Friends from "./pages/Friends";
import Streams from "./pages/Streams";
import Assistant from "./pages/Assistant";
import NotFound from "./pages/NotFound";
import AuthGuard from "./components/auth/AuthGuard";
import ScreenCapture from "./pages/ScreenCapture"; // ✅ Página de transmissão de tela

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />

          {/* Rotas protegidas */}
          <Route path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
          <Route path="/messages" element={<AuthGuard><Messages /></AuthGuard>} />
          <Route path="/friends" element={<AuthGuard><Friends /></AuthGuard>} />
          <Route path="/streams" element={<AuthGuard><Streams /></AuthGuard>} />
          <Route path="/assistant" element={<AuthGuard><Assistant /></AuthGuard>} />
          <Route path="/transmissao" element={<AuthGuard><ScreenCapture /></AuthGuard>} /> {/* ✅ Nova rota */}

          {/* Rota 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

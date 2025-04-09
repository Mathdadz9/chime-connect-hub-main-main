
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, 
  MessageCircle, 
  Users, 
  Video, 
  HelpCircle, 
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface SidebarProps {
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

const Sidebar = ({ isMobileOpen, onMobileClose }: SidebarProps) => {
  const navigationItems = [
    {
      icon: Home,
      text: 'Início',
      to: '/dashboard',
    },
    {
      icon: MessageCircle,
      text: 'Mensagens',
      to: '/messages',
    },
    {
      icon: Users,
      text: 'Amigos',
      to: '/friends',
    },
    {
      icon: Video,
      text: 'Transmissões',
      to: '/streams',
    },
    
  ];

  // Canais simulados
  const channels = [
    { id: '1', name: 'Geral', unread: true },
    { id: '2', name: 'Jogos', unread: false },
    { id: '3', name: 'Programação', unread: false },
  ];

  // Amigos simulados online
  const onlineFriends = [
    { id: '1', name: 'Carlos Silva', avatar: null },
    { id: '2', name: 'Ana Martins', avatar: null },
    { id: '3', name: 'Pedro Costa', avatar: null },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:relative w-64 h-[calc(100vh-3.5rem)] bg-sidebar z-50",
          "flex-col border-r border-sidebar-border",
          "lg:flex",
          isMobileOpen ? "flex" : "hidden"
        )}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Main navigation */}
          <nav className="p-3 space-y-1">
            {navigationItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onMobileClose}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md",
                    "hover:bg-sidebar-accent transition-colors duration-200",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-foreground"
                      : "text-sidebar-foreground/80"
                  )
                }
              >
                <item.icon size={20} />
                <span>{item.text}</span>
              </NavLink>
            ))}
          </nav>

          <Separator className="my-2 bg-sidebar-border" />

          {/* Canais */}
          <div className="p-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-sidebar-foreground/70">
                CANAIS
              </h3>
              <Button variant="ghost" size="icon" className="h-5 w-5 text-sidebar-foreground/70">
                <Plus size={16} />
              </Button>
            </div>
            <div className="space-y-1">
              {channels.map((channel) => (
                <button
                  key={channel.id}
                  className="w-full flex items-center justify-between px-2 py-1 rounded-md hover:bg-sidebar-accent/70 text-sidebar-foreground/80"
                >
                  <span className="flex items-center">
                    <span className="text-[#7c8084] mr-2">#</span>
                    {channel.name}
                  </span>
                  {channel.unread && (
                    <span className="h-2 w-2 rounded-full bg-primary animate-pulse-subtle" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <Separator className="my-2 bg-sidebar-border" />

          {/* Amigos online */}
          <div className="p-3 flex-1">
            <h3 className="text-sm font-medium text-sidebar-foreground/70 mb-2">
              AMIGOS ONLINE — {onlineFriends.length}
            </h3>
            <div className="space-y-1">
              {onlineFriends.map((friend) => (
                <div
                  key={friend.id}
                  className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-sidebar-accent/70"
                >
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center text-xs text-sidebar-foreground">
                      {friend.name.substring(0, 1)}
                    </div>
                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-sidebar" />
                  </div>
                  <span className="text-sidebar-foreground/80 text-sm">
                    {friend.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* User info */}
          <div className="p-3 mt-auto border-t border-sidebar-border bg-sidebar-accent/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs text-primary-foreground">
                UC
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  Usuário Conectado
                </p>
                <p className="text-xs text-sidebar-foreground/70 truncate">
                  #usuario123
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

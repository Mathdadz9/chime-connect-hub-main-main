// src/components/ChatbaseWidget.tsx
import { useEffect, useRef } from 'react';

const ChatbaseWidget = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.chatbase.co/chatbot-iframe/y_N7k23Gs8oHBoi_aQkao';
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.style.border = 'none';

    if (containerRef.current) {
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(iframe);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[600px] max-w-4xl mx-auto my-8 border rounded-lg overflow-hidden shadow-lg bg-white"
    />
  );
};

export default ChatbaseWidget;

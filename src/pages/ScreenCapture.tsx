import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ScreenCapture = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const webcamRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [webcamStream, setWebcamStream] = useState<MediaStream | null>(null);
  const [paused, setPaused] = useState(false);
  const [webcamPaused, setWebcamPaused] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [recording, setRecording] = useState(false);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const navigate = useNavigate();

  const startCapture = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
      setStream(screenStream);
      if (videoRef.current) {
        videoRef.current.srcObject = screenStream;
      }
    } catch (err) {
      console.error('Erro ao capturar a tela:', err);
    }
  };

  const startWebcam = async () => {
    try {
      const camStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setWebcamStream(camStream);
      if (webcamRef.current) {
        webcamRef.current.srcObject = camStream;
      }
    } catch (err) {
      console.error('Erro ao acessar a webcam:', err);
    }
  };

  const togglePause = () => {
    if (!stream) return;
    stream.getTracks().forEach(track => (track.enabled = !track.enabled));
    setPaused(prev => !prev);
  };

  const toggleWebcam = () => {
    if (!webcamStream) return;
    webcamStream.getTracks().forEach(track => (track.enabled = !track.enabled));
    setWebcamPaused(prev => !prev);
  };

  const handleShare = () => {
    const dummyLink = 'https://minhaplataforma.com/transmissao/12345';
    setShareLink(dummyLink);
    navigator.clipboard.writeText(dummyLink);
    alert('Link de compartilhamento copiado!');
  };

  const startRecording = () => {
    if (!stream) return;
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = event => {
      if (event.data.size > 0) {
        setRecordedChunks(prev => [...prev, event.data]);
      }
    };
    mediaRecorder.start();
    setRecorder(mediaRecorder);
    setRecording(true);
  };

  const stopRecording = () => {
    if (recorder) {
      recorder.stop();
      setRecording(false);
    }
  };

  const downloadRecording = () => {
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'gravacao.webm';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const endStream = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (webcamStream) {
      webcamStream.getTracks().forEach(track => track.stop());
      setWebcamStream(null);
    }
    navigate('/streams');
  };

  useEffect(() => {
    startWebcam();
  }, []);

  return (
    <div className="p-6 flex flex-col items-center justify-center space-y-6">
      <div className="flex justify-between w-full">
        <Button variant="outline" onClick={() => navigate('/streams')}>
          Voltar para Transmissões
        </Button>
        <Button onClick={() => setShowConfig(!showConfig)}>
          {showConfig ? 'Fechar Configurações' : 'Abrir Configurações'}
        </Button>
      </div>

      {showConfig && (
        <div className="w-full max-w-2xl p-4 border rounded shadow bg-muted">
          <h2 className="text-lg font-semibold mb-2">Configurações de Transmissão</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="font-medium">Qualidade de Vídeo</label>
              <select className="w-full rounded p-2 border">
                <option>Alta (1080p)</option>
                <option>Média (720p)</option>
                <option>Baixa (480p)</option>
              </select>
            </div>
            <div>
              <label className="font-medium">Fonte de Áudio</label>
              <select className="w-full rounded p-2 border">
                <option>Áudio do sistema</option>
                <option>Microfone</option>
              </select>
            </div>
            <div>
              <label className="font-medium">Resolução da Tela</label>
              <select className="w-full rounded p-2 border">
                <option>Automática</option>
                <option>Full HD</option>
                <option>HD</option>
              </select>
            </div>
            <div>
              <label className="font-medium">Layout da Transmissão</label>
              <select className="w-full rounded p-2 border">
                <option>Webcam no canto</option>
                <option>Webcam em tela cheia</option>
                <option>Somente tela</option>
              </select>
            </div>
            <div>
              <label className="font-medium">Tema Visual</label>
              <select className="w-full rounded p-2 border">
                <option>Padrão</option>
                <option>Escuro</option>
                <option>Claro</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="relative w-full max-w-4xl border rounded overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          controls
          className="w-full rounded shadow"
        />
        <video
          ref={webcamRef}
          autoPlay
          muted
          playsInline
          className="absolute bottom-4 right-4 w-40 h-32 border-4 border-white rounded shadow-lg"
        />
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        <Button onClick={startCapture} variant="default">
          Iniciar Captura de Tela
        </Button>
        <Button onClick={togglePause} variant="secondary">
          {paused ? 'Retomar Transmissão' : 'Pausar Transmissão'}
        </Button>
        <Button onClick={toggleWebcam} variant="secondary">
          {webcamPaused ? 'Retomar Webcam' : 'Pausar Webcam'}
        </Button>
        <Button onClick={handleShare} variant="outline">
          Compartilhar Link
        </Button>
        {!recording ? (
          <Button onClick={startRecording} variant="destructive">
            Gravar Transmissão
          </Button>
        ) : (
          <>
            <Button onClick={stopRecording} variant="destructive">
              Parar Gravação
            </Button>
            <Button onClick={downloadRecording} variant="outline">
              Baixar Gravação
            </Button>
          </>
        )}
        <Button onClick={endStream} variant="ghost">
          Encerrar Transmissão
        </Button>
      </div>

      {shareLink && (
        <div className="mt-4 text-sm text-muted-foreground">
          Link de Transmissão: <span className="font-medium">{shareLink}</span>
        </div>
      )}
    </div>
  );
};

export default ScreenCapture;
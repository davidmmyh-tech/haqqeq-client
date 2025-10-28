import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Pause, Play } from 'lucide-react';
import { remote } from '@/lib/utils';

type Props = {
  src: string | null;
};

export default function SoundTrack({ src }: Props) {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isErorr, setIsErorr] = useState(!src);
  const [soundSrc, setSoundSrc] = useState(() => (src ? remote(src) : 'test.mp3'));

  useEffect(() => {
    if (waveformRef.current) {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }

      const ws = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#b0b0b0',
        progressColor: '#1f2937',
        height: 40,
        cursorWidth: 0,
        barWidth: 3,
        barRadius: 3,
        barGap: 4
      });
      wavesurferRef.current = ws;

      const onPlay = () => setIsPlaying(true);
      const onPause = () => setIsPlaying(false);
      const onError = () => {
        setIsErorr(true);
        setSoundSrc('test.mp3');
      };
      const onFinish = () => {
        setIsPlaying(false);
        ws.seekTo(0);
      };

      ws.on('error', onError);
      ws.on('play', onPlay);
      ws.on('pause', onPause);
      ws.on('finish', onFinish);

      ws.load(soundSrc);

      return () => {
        ws.un('error', onError);
        ws.un('play', onPlay);
        ws.un('pause', onPause);
        ws.un('finish', onFinish);
        ws.destroy();
      };
    }
  }, [soundSrc]);

  const togglePlay = () => {
    wavesurferRef.current?.playPause();
  };

  return (
    <div className="relative flex w-full items-center gap-1 px-4">
      {isErorr && (
        <div className="bg-background/0 absolute inset-0 z-5 flex items-center">
          <p>الصوت غير متاح</p>
        </div>
      )}
      <button
        onClick={togglePlay}
        className={`outline-primary flex h-5 w-5 items-center justify-center rounded-full text-white outline-3 ${isErorr ? 'opacity-30' : ''}`}
      >
        {isPlaying ? (
          <Pause className="fill-primary stroke-0" size={12} />
        ) : (
          <Play className="fill-primary stroke-0" size={12} />
        )}
      </button>

      {/* Waveform */}
      <div ref={waveformRef} className={`flex-1 ${isErorr ? 'opacity-30' : ''}`} />
    </div>
  );
}

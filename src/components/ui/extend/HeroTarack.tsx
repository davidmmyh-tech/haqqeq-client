import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { thump } from '@/assets/images';
import { Pause, Play } from 'lucide-react';
import { formatDuration, remote } from '@/lib/utils';

type Props = {
  src?: string | null;
};

export default function HeroAudio({ src }: Props) {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [detectedDuration, setDetectedDuration] = useState<number | null>(null);

  useEffect(() => {
    if (waveformRef.current) {
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#b0b0b0',
        progressColor: '#1f2937',
        height: 60,
        cursorWidth: 0,
        barWidth: 5,
        barRadius: 8,
        barGap: 6
      });

      const ws = wavesurferRef.current;
      ws.load(remote(src || ''));

      const onReady = () => {
        const d = ws.getDuration();
        setDetectedDuration(isFinite(d) ? d : null);
      };
      const onPlay = () => setIsPlaying(true);
      const onPause = () => setIsPlaying(false);
      const onFinish = () => {
        setIsPlaying(false);
        ws.seekTo(0);
      };

      ws.on('ready', onReady);
      ws.on('play', onPlay);
      ws.on('pause', onPause);
      ws.on('finish', onFinish);

      return () => {
        ws.un('ready', onReady);
        ws.un('play', onPlay);
        ws.un('pause', onPause);
        ws.un('finish', onFinish);
        ws.destroy();
      };
    }
  }, [src]);

  const togglePlay = () => {
    wavesurferRef.current?.playPause();
  };

  return (
    <div className="flex items-stretch gap-3 rounded-[19px] bg-[#ECE6E6] p-2.5">
      {/* Like */}
      <button className="bg-primary w-20 rounded-md text-white">
        <img src={thump} alt="thump" />
      </button>

      <div className="relative flex w-full items-center gap-1 rounded-md bg-[#FEDFCA] px-4">
        <button
          onClick={togglePlay}
          className="outline-primary flex h-8 w-8 items-center justify-center rounded-full text-white outline-4"
        >
          {isPlaying ? (
            <Pause className="fill-primary stroke-0" size={18} />
          ) : (
            <Play className="fill-primary stroke-0" size={18} />
          )}
        </button>

        {/* Duration: prefer prop, otherwise show detected duration */}
        <span className="text-primary absolute end-4 bottom-1 block rounded-sm bg-[#F7EEEE] px-2 pb-1 text-xs font-medium">
          {formatDuration(detectedDuration)}
        </span>

        {/* Waveform */}
        <div ref={waveformRef} className="flex-1" />
      </div>
    </div>
  );
}

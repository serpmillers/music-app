// will directly fetch and provide data for music player state and controls
import React, {createContext, useContext, useState, useCallback, useEffect, ReactNode} from "react";

export type Track = {
  id: string | number;
  title: string;
  artist?: string;
  album?: string;
  duration?: number; // seconds
  artUrl?: string;
  [k: string]: any;
};

type PlayerContextType = {
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number;
  queue: Track[];
  queueIndex: number;

  // controls
  isShuffle: boolean;
  isLooped: boolean;
  toggleShuffle: () => void;
  toggleLoop: () => void;

  // actions
  playTrack: (t: Track, index?: number, opts?: {autoPlay?: boolean}) => void;
  togglePlay: () => void;
  pause: () => void;
  play: () => void;
  seek: (seconds: number) => void;
  setQueue: (tracks: Track[], startIndex?: number, autoPlay?: boolean) => void;
  next: () => void;
  prev: () => void;
  isCurrent: (id: string | number) => boolean;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const usePlayer = () => {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used inside PlayerProvider");
  return ctx;
};

export const PlayerProvider = ({children}:{children:ReactNode}) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [queue, setQueueState] = useState<Track[]>([]);
  const [queueIndex, setQueueIndex] = useState(0);

  // new centralized shuffle/loop flags
  const [isShuffle, setIsShuffle] = useState(false);
  const [isLooped, setIsLooped] = useState(false);

  // sync progress reset when track changes
  useEffect(() => {
    setProgress(0);
  }, [currentTrack?.id]);

  const play = useCallback(() => setIsPlaying(true), []);
  const pause = useCallback(() => setIsPlaying(false), []);
  const togglePlay = useCallback(() => setIsPlaying(p => !p), []);

  const toggleShuffle = useCallback(() => setIsShuffle(s => !s), []);
  const toggleLoop = useCallback(() => setIsLooped(l => !l), []);

  const playTrack = useCallback((t: Track, index?: number, opts?: {autoPlay?: boolean}) => {
    setCurrentTrack(t);
    if (typeof index === "number") setQueueIndex(index);
    if (opts?.autoPlay ?? true) setIsPlaying(true);
  }, []);

  const setQueue = useCallback((tracks: Track[], startIndex = 0, autoPlay = false) => {
    setQueueState(tracks);
    setQueueIndex(startIndex);
    const t = tracks[startIndex] ?? null;
    setCurrentTrack(t);
    setIsPlaying(!!autoPlay && !!t);
  }, []);

  const seek = useCallback((seconds: number) => {
    setProgress(seconds);
  }, []);

  const next = useCallback(() => {
    if (queue.length === 0) return;

    // shuffle -> random index (will be refined later, when connections are done)
    if (isShuffle) {
      if (queue.length === 1) {
        setQueueIndex(0);
        setCurrentTrack(queue[0]);
        setProgress(0);
        setIsPlaying(true);
        return;
      }
      let rand = Math.floor(Math.random() * queue.length);
      // avoid same index if possible
      if (rand === queueIndex) {
        rand = (rand + 1) % queue.length;
      }
      setQueueIndex(rand);
      setCurrentTrack(queue[rand]);
      setProgress(0);
      setIsPlaying(true);
      return;
    }

    // normal flow
    const nextIndex = queueIndex + 1;
    if (nextIndex >= queue.length) {
      if (isLooped) {
        setQueueIndex(0);
        setCurrentTrack(queue[0]);
        setProgress(0);
        setIsPlaying(true);
      } else {
        // reached end and not looping: stop playback (or keep last track paused)
        setIsPlaying(false);
      }
      return;
    }

    setQueueIndex(nextIndex);
    setCurrentTrack(queue[nextIndex]);
    setProgress(0);
    setIsPlaying(true);
  }, [queue, queueIndex, isShuffle, isLooped]);

  const prev = useCallback(() => {
    if (queue.length === 0) return;

    if (isShuffle) {
      if (queue.length === 1) {
        setQueueIndex(0);
        setCurrentTrack(queue[0]);
        setProgress(0);
        setIsPlaying(true);
        return;
      }
      let rand = Math.floor(Math.random() * queue.length);
      if (rand === queueIndex) rand = (rand - 1 + queue.length) % queue.length;
      setQueueIndex(rand);
      setCurrentTrack(queue[rand]);
      setProgress(0);
      setIsPlaying(true);
      return;
    }

    const prevIndex = queueIndex - 1;
    if (prevIndex < 0) {
      if (isLooped) {
        const last = queue.length - 1;
        setQueueIndex(last);
        setCurrentTrack(queue[last]);
        setProgress(0);
        setIsPlaying(true);
      } else {
        // already at start - keep first track
        setQueueIndex(0);
        setCurrentTrack(queue[0]);
        setProgress(0);
        setIsPlaying(true);
      }
      return;
    }

    setQueueIndex(prevIndex);
    setCurrentTrack(queue[prevIndex]);
    setProgress(0);
    setIsPlaying(true);
  }, [queue, queueIndex, isShuffle, isLooped]);

  const isCurrent = useCallback((id: string|number) => currentTrack?.id === id, [currentTrack]);

  const value: PlayerContextType = {
    currentTrack,
    isPlaying,
    progress,
    queue,
    queueIndex,
    isShuffle,
    isLooped,
    toggleShuffle,
    toggleLoop,
    playTrack,
    togglePlay,
    pause,
    play,
    seek,
    setQueue,
    next,
    prev,
    isCurrent
  };

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
};

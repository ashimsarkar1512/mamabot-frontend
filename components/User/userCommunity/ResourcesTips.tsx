import React, { useState, useRef, useEffect } from "react";
import { BookOpen, Shield, Music, Play, Pause, ChevronRight, ListMusic } from "lucide-react";
import { useGetAllRelaxationAudiosQuery, useGetRelaxationAudiosUserListenQuery } from "@/redux/features/api/user/community";

const ResourcesTips = () => {
  const { data: defaultAudioResponse } = useGetRelaxationAudiosUserListenQuery(undefined);
  const { data: playlistResponse } = useGetAllRelaxationAudiosQuery(undefined);

  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [activeTrack, setActiveTrack] = useState<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize with the featured/default track from the first API ONLY once
  useEffect(() => {
    if (defaultAudioResponse?.data && !activeTrack) {
      setActiveTrack(defaultAudioResponse.data);
    }
  }, [defaultAudioResponse, activeTrack]);

  const audioUrl = activeTrack?.audio_url;

  const handleToggleAudio = () => {
    if (!audioUrl || !audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Direct play call for user-initiated action
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          if (err.name !== "AbortError") {
            console.error("Playback failed:", err);
            setIsPlaying(false);
          }
        });
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleTrackSelect = (track: any) => {
    if (activeTrack?.id === track.id) {
      handleToggleAudio();
      return;
    }
    
    // Independent selection from playlist API
    setActiveTrack(track);
    setIsPlaying(true);
  };

  // Sync playback safely
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioUrl) return;

    const playAudio = () => {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          if (err.name !== "AbortError") {
            setIsPlaying(false);
          }
        });
      }
    };

    if (isPlaying) {
      // If src changed, load and then play
      // Check normalized URL to avoid redundant loads
      const currentSrc = audio.src;
      // Browser absolute URL vs provided URL
      if (!currentSrc.endsWith(audioUrl)) {
        audio.load();
      }
      playAudio();
    } else {
      audio.pause();
    }
  }, [audioUrl, isPlaying]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div className="w-full md:w-98 bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden font-sans">
      {/* Audio element - Fix: avoid empty string src */}
      <audio
        ref={audioRef}
        src={activeTrack?.audio_url || undefined}
        onEnded={() => setIsPlaying(false)}
        preload="auto"
      />

      {/* --- Header Section --- */}
      <div className="bg-[#FFEAF5] px-6 py-6 flex items-center gap-3">
        <BookOpen className="w-7 h-7 text-[#E73F80]" strokeWidth={2} />
        <h2 className="text-xl md:text-2xl font-bold text-[#E73F80]">
          Resources & Tips
        </h2>
      </div>

      {/* --- Content Body --- */}
      <div className="p-4 flex flex-col gap-4">
        {/* 1. Community Guidelines Card */}
        <div className="border border-pink-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-gray-800" />
            <span className="font-semibold text-lg text-gray-900">
              Community Guidelines
            </span>
          </div>

          <button className="w-full border border-pink-200 rounded-xl px-4 py-3 flex justify-between items-center bg-white hover:bg-pink-50 transition-colors group">
            <span className="text-[#E73F80] font-medium">Read Guidelines</span>
            <ChevronRight className="w-5 h-5 text-[#E73F80] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 2. Relaxation Audio Card */}
        <div className="border border-blue-200 rounded-2xl p-4 bg-gradient-to-b from-white to-blue-50/10">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Music className="w-6 h-6 text-pink-400 absolute -left-1 top-0 opacity-80" />
                <Music className="w-6 h-6 text-blue-500 relative left-1" />
              </div>
              <span className="font-semibold text-lg text-gray-900 ml-1">
                Relaxation Audio
              </span>
            </div>
            <button
              onClick={() => setShowPlaylist(!showPlaylist)}
              className="text-xs font-bold text-[#E73F80] hover:underline flex items-center gap-1"
            >
              <ListMusic className="w-4 h-4" />
              {showPlaylist ? "Hide Playlist" : "View Playlist"}
            </button>
          </div>

          {/* Current Track Display */}
          <div className="mb-3 px-1 min-h-[44px] flex flex-col justify-end">
            {activeTrack ? (
              <>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                  {isPlaying ? "Now Playing" : "Ready to Listen"}
                </p>
                <p className="text-base font-bold text-gray-900 truncate">
                  {activeTrack.title}
                </p>
              </>
            ) : (
              <p className="text-sm text-gray-400 italic">Initializing...</p>
            )}
          </div>

          <button
            onClick={handleToggleAudio}
            disabled={!audioUrl}
            className={`w-full ${
              isPlaying
                ? "bg-pink-500 hover:bg-pink-600 shadow-pink-100"
                : "bg-[#2898CD] hover:bg-[#2080af] shadow-blue-100"
            } text-white rounded-xl py-4 flex items-center justify-center gap-3 transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <div
              className={`rounded-full p-1 transition-transform ${
                isPlaying ? "bg-white/20" : "border-2 border-white"
              }`}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </div>
            <span className="font-bold text-lg">
              {isPlaying ? "Pause" : "Listen Now"}
            </span>
          </button>

          {/* Playlist Section - Completely independent list */}
          {showPlaylist && playlistResponse?.data && (
            <div className="mt-4 border-t border-blue-100 pt-4 flex flex-col gap-2 max-h-60 overflow-y-auto custom-scrollbar">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1 mb-1">
                More Relaxation Music
              </p>
              {playlistResponse.data.map((track: any) => (
                <button
                  key={track.id}
                  onClick={() => handleTrackSelect(track)}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all text-left group ${
                    activeTrack?.id === track.id
                      ? "bg-blue-50 text-blue-600 ring-1 ring-blue-100"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg transition-colors ${
                      activeTrack?.id === track.id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-400 group-hover:bg-blue-100 group-hover:text-blue-500"
                    }`}
                  >
                    {activeTrack?.id === track.id && isPlaying ? (
                      <Pause className="w-3 h-3 fill-current" />
                    ) : (
                      <Play className="w-3 h-3 fill-current ml-0.5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate group-hover:text-blue-600">
                      {track.title}
                    </p>
                    {activeTrack?.id === track.id && isPlaying && (
                      <span className="text-[10px] font-black uppercase text-blue-400 animate-pulse">
                        Playing
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 3. Popular Topics Card */}
        <div className="border border-blue-200 rounded-2xl p-4">
          <h3 className="font-semibold text-lg text-gray-900 mb-3">
            Popular Topics This Week
          </h3>

          <div className="flex flex-col gap-2.5">
            <div className="border border-blue-100 rounded-xl px-4 py-3 text-gray-700 bg-white hover:border-blue-300 cursor-pointer transition-colors">
              Stretch Marks Prevention
            </div>
            <div className="border border-blue-100 rounded-xl px-4 py-3 text-gray-700 bg-white hover:border-blue-300 cursor-pointer transition-colors">
              Baby Kicks Awareness
            </div>
            <div className="border border-blue-100 rounded-xl px-4 py-3 text-gray-700 bg-white hover:border-blue-300 cursor-pointer transition-colors">
              Emotional Support
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesTips;

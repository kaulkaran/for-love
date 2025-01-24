import React, { useState, useEffect, useRef } from "react";
import {
  Heart,
  Music4,
  Quote,
  ArrowRight,
  Star,
  Play,
  Pause,
} from "lucide-react";
import QuizSection from "./components/Quiz";

interface Song {
  id: number;
  title: string;
  artist: string;
  imageUrl: string;
  audioUrl: string;
  lyrics: string;
  comment: string;
}

interface AudioPlayerProps {
  audioUrl: string;
}

function AudioPlayer({ audioUrl }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              setError(null);
            })
            .catch(() => {
              setError("Unable to play audio. Please try again later.");
              setIsPlaying(false);
            });
        }
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const bounds = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const percentage = x / bounds.width;
      audioRef.current.currentTime = percentage * audioRef.current.duration;
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
      audioRef.current.addEventListener("ended", () => setIsPlaying(false));
      audioRef.current.addEventListener("error", () => {
        setError("Error loading audio. Please check the file.");
      });
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        audioRef.current.removeEventListener("ended", () => setIsPlaying(false));
      }
    };
  }, []);

  if (!audioUrl) return <p className="text-red-400">No audio file provided.</p>;

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-4">
          <button
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-pink-500 hover:bg-pink-600 flex items-center justify-center transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-white" />
            ) : (
              <Play className="w-6 h-6 text-white" />
            )}
          </button>
          <div className="flex-1">
            <div
              className="h-2 bg-white/20 rounded-full cursor-pointer relative overflow-hidden"
              onClick={handleProgressClick}
            >
              <div
                className="absolute left-0 top-0 bottom-0 bg-pink-500 rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
      </div>
    </div>
  );
}

const songs: Song[] = [
  {
    id: 1,
    title: "Perfect",
    artist: "Ed Sheeran",
    imageUrl:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop",
    audioUrl:
      "https://res.cloudinary.com/dw5ow19cc/video/upload/v1737443343/pagalworld.com.mx-Perfect_iqtv60.mp3",
    lyrics: `I found a love for me
Oh darling, just dive right in and follow my lead
Well, I found a girl, beautiful and sweet
Oh, I never knew you were the someone waiting for me...`,
    comment:
      "This song reminds me of our first dance together, Saranya. Every word feels like it was written for us...",
  },
  {
    id: 2,
    title: "All of Me",
    artist: "John Legend",
    imageUrl:
      "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800&auto=format&fit=crop",
    audioUrl: "",
    lyrics: `What would I do without your smart mouth?
Drawing me in, and you kicking me out
You've got my head spinning, no kidding
I can't pin you down...`,
    comment:
      "Every time I hear this song, I think about how perfectly it describes our love story...",
  },
  {
    id: 3,
    title: "Har Ek Pal",
    artist: "Ashu Shukla",
    imageUrl: "https://images.unsplash.com/photo-1602619074972-d3525c7aa1d9?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    audioUrl: "https://res.cloudinary.com/dw5ow19cc/video/upload/v1737642919/Har_Ek_Pal_-_Ashu_Shukla_Pehchan_Music_Latest_Hindi_Songs_2020_ynekvs.mp3",
    lyrics: `Hain bahut si baatein kehne ko, Dil ye hausla juta raha, Suni-suni si baatein lagti hain. Par ye mere dil ka haal hai`,
    comment: "Saranya, every time I hear this song, it feels like it’s narrating the story of us. You’re my favorite melody. ❤️"
    },
    {
    id: 4,
    title: "Judai",
    artist: "Pritam, Kamran Ahmed",
    imageUrl: "https://images.unsplash.com/photo-1632150050176-90c896622560?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    audioUrl: "https://res.cloudinary.com/dw5ow19cc/video/upload/v1737642918/Judai_Best_Video_-_JannatEmraan_HashmiSonal_ChauhanKamran_AhmedPritam_sumisx.mp3",
    lyrics: `Tere bin dil mera laage kahin na
    Tere bin jaan meri jaaye kahin na
    Kitne zamane baad, oh, Rabba
    Yaad tu aaya, yaad tu aaya`,
    comment: "Saranya, the lyrics remind me of how lucky I am to have you in my life. You make every day beautiful. 🌸"
    },
];

function StarField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-twinkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        >
          <Star className="w-2 h-2 text-purple-200" />
        </div>
      ))}
    </div>
  );
}

function App() {
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-600 to-pink-500 flex items-center justify-center">
        <Heart className="w-16 h-16 text-white animate-pulse" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-600 to-pink-500 relative">
      <StarField />

      {!showPlaylist ? (
        <div className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center">
          <div className="space-y-8">
            <h1 className="text-6xl font-bold text-white mb-4">
              Welcome to Our Playlist
              <span className="block text-pink-300 mt-2">Saranya ❤️</span>
            </h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto leading-relaxed">
              A collection of songs that tell our story, capture our moments,
              and express my love for you.
            </p>
            <button
              onClick={() => setShowPlaylist(true)}
              className="group bg-white text-purple-700 px-8 py-4 rounded-full text-xl font-semibold 
                       hover:bg-purple-100 transition-all duration-300 transform hover:scale-105
                       flex items-center space-x-2 mx-auto"
            >
              <span>Dive Into Our Playlist</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-12">
          <button
            onClick={() => setShowPlaylist(false)}
            className="text-white mb-8 hover:text-pink-200 transition-colors flex items-center space-x-2"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
            <span>Back to Home</span>
          </button>
          <div
            className="flex overflow-x-auto space-x-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
            style={{ whiteSpace: "nowrap", paddingBottom: "20px" }}
          >
            {songs.map((song) => (
              <div
                key={song.id}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-white shadow-xl
                         hover:transform hover:scale-[1.02] transition-all duration-300 flex flex-col space-y-4 w-96"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="aspect-square rounded-xl overflow-hidden">
                      <img
                        src={song.imageUrl}
                        alt={`${song.title} by ${song.artist}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold flex items-center">
                        <Music4 className="w-6 h-6 mr-2 text-pink-300" />
                        {song.title}
                      </h3>
                      <p className="text-purple-200">{song.artist}</p>
                    </div>
                    <AudioPlayer audioUrl={song.audioUrl} />
                  </div>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center mb-2">
                        <Quote className="text-pink-300 w-5 h-5 mr-2" />
                        <h4 className="text-xl font-medium">Lyrics</h4>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4 h-48 overflow-y-auto">
                        <p className="whitespace-pre-line text-purple-100">
                          {song.lyrics}
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="w-full flex items-center mb-2">
                        <Heart className="text-pink-300 w-5 h-5 mr-2" />
                        <h4 className="text-xl font-medium">
                          Why This Song Is Special
                        </h4>
                      </div>
                      <div  className="bg-white/5 rounded-lg p-4 max-h-35 overflow-y-auto" >
                      <p className="text-purple-100 whitespace-pre-line">{song.comment}</p>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        
        </div>
      )}
    </div>
  );
}

export default App;

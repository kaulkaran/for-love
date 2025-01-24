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
    audioUrl: "https://res.cloudinary.com/dw5ow19cc/video/upload/v1737443343/pagalworld.com.mx-Perfect_iqtv60.mp3",
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
    artist: "Pritam",
    imageUrl: "https://images.unsplash.com/photo-1632150050176-90c896622560?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    audioUrl: "https://res.cloudinary.com/dw5ow19cc/video/upload/v1737642918/Judai_Best_Video_-_JannatEmraan_HashmiSonal_ChauhanKamran_AhmedPritam_sumisx.mp3",
    lyrics: `Tere bin dil mera laage kahin na
    Tere bin jaan meri jaaye kahin na
    Kitne zamane baad, oh, Rabba
    Yaad tu aaya, yaad tu aaya`,
    comment: "Saranya, the lyrics remind me of how lucky I am to have you in my life. You make every day beautiful. 🌸"
    },
  {
    id: 5,
  title: "Tune Mere Jana",
    artist: "Gajendra Verma",
    imageUrl: "https://images.unsplash.com/photo-1642511283397-e0bc9d502762?q=80&w=1288&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    audioUrl: "https://res.cloudinary.com/dw5ow19cc/video/upload/v1737642921/Gajendra_Verma_-_Tune_Mere_Jaana_Kabhi_Nahi_Jaana_I_Emptiness_Gajendra_Verma_Songs_Sonotek_Music_e1tpsh.mp3",
    lyrics: `Tune mere jaana, Kabhi nahi jaana`,
    comment: "An emotional song that resonates with lost love."
    },
   {
    id: 6,
    title: "Kiven Mukhde",
    artist: "Madhur Sharma",
    imageUrl: "https://images.unsplash.com/photo-1663331010792-071c2a0caeb8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    audioUrl: "https://res.cloudinary.com/dw5ow19cc/video/upload/v1737642925/Tere_Jeya_Hor_Disda_-_Madhur_Sharma_Kiven_Mukhde_PearlRecords_Nusrat_Sahab_uk7wba.mp3",
    lyrics: `Teri nazron se pi hai khuda ki qasam,
    Umr saari nashay main guzar jaye gi`,
    comment: "Every note of this song echoes the way my heart feels when I see your smile."
    },
  {
    id: 7,
    title: "Tu Itni Khoobsurat Hai",
    artist: "Rahat Fateh Ali Khan",
    imageUrl: "https://images.unsplash.com/photo-1724829825151-9e85eeb3fa80?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    audioUrl: "https://res.cloudinary.com/dw5ow19cc/video/upload/v1737642924/Tu_Itni_Khoobsurat_Hai_Full_Video_Barkhaa_Rahat_Fateh_Ali_Khan_Sara_Lorren_Amjad_Nadeem_ahxpid.mp3",
    lyrics: `Tu hi shaamil raha duaa mein meri,
    Naam tera rahaa zubaan pe meri`,
    comment: "This track is good, but nothing compares to the rhythm of your laughter, Saranya."
    },
    {
    id: 8,
    title: "Raani",
    artist: "Karan Sehmbi",
    imageUrl: "https://images.unsplash.com/photo-1681629996793-28047b0cfca4?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    audioUrl: "https://res.cloudinary.com/dw5ow19cc/video/upload/v1737642928/Karan_Sehmbi__Raani_Official_Video_Rox_A_Ricky_Tru_Makers_Latest_Punjabi_Songs_2018_wtgyxt.mp3",
    lyrics: `Akhiyaan nu har pal chain ae,
    Tainu vekh vekh rajjde na nain ae`,
    comment: "Saranya, this song is special, but it’s you who gives meaning to every word in it. 🌹"
    },
    {
    id: 9,
    title: "Jeen Di Gal",
    artist: "Prabh Gill",
    imageUrl: "https://images.unsplash.com/photo-1695636696592-0f6a2935d5ee?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    audioUrl: "https://res.cloudinary.com/dw5ow19cc/video/upload/v1737642923/Prabh_Gill_-_Jeen_Di_Gal_Feat_Raxstar_Latest_Punjabi_Songs_b9pfv1.mp3",
    lyrics: `Mainu neend na aave raatan nu,
    Mainu chain na aave raatan nu.`,
    comment: "I could listen to this on repeat forever, just like I could stare into your eyes endlessly."
    },
    {
    id: 10,
    title: "Desire",
    artist: "Prabh Gill",
    imageUrl: "https://images.unsplash.com/photo-1695636877871-2484c46e6452?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    audioUrl: "https://res.cloudinary.com/dw5ow19cc/video/upload/v1737642923/Desire_Prabh_Gill_Ft._Raashi_Sood_Ar_Deep_Latest_Punjabi_Songs_New_Punjabi_Songs_tdprtr.mp3",
    lyrics: "Wah Khudaya Kya Nazare, Tainu Takiye Je Khalo’ke,",
    comment: "Saranya, if our story had a soundtrack, this would be one of the highlights. 🎶"
    },
    {
    id: 11,
    title: "Laal Ishq",
    artist: "Rahat Fateh Ali Khan",
    imageUrl: "https://images.unsplash.com/photo-1616597053809-fad010d870c1?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    audioUrl: "https://res.cloudinary.com/dw5ow19cc/video/upload/v1737642925/Laal_Ishq_-_A_sequel_of_Landa_Bazar_OST_by_Rahat_Fateh_Ali_Khan_CU2_xdfb0d.mp3",
    lyrics: `Ek Mohabbat Se Yeh,
    Na Sambhaale Gaye`,
    comment: "Every beat of this song resonates with the way my heart skips for you."
    },
    {
    id: 12,
    title: "Akhiyan",
    artist: "Rahat Fateh Ali Khan",
    imageUrl: "https://images.unsplash.com/photo-1627731306172-b8ae5fe92320?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    audioUrl: "https://res.cloudinary.com/dw5ow19cc/video/upload/v1737643408/Akhiyan_Full_Audio_Song_Rahat_Fateh_Ali_Khan_Punjabi_Song_Collection_Speed_Records_wqnmj7.mp3",
    lyrics: `Tainu takkeya te dull gayian akhiyan akhiyan,
    Saari duniya nu bhull gayian akhiyan akhiyan`,
  comment: "This song paints a picture of love, but you make it come alive for me."
    },
    {
    id: 13,
    title: "Chaahat",
    artist: "Rahat Fateh Ali Khan",
    imageUrl: "https://images.unsplash.com/photo-1626358134206-0d1b77d48f21?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    audioUrl: "https://res.cloudinary.com/dw5ow19cc/video/upload/v1737643425/Chaahat_-_Official_4K_Version_Rahat_Fateh_Ali_Khan_Blood_Money_Kunal_Khemu_Jeet_Gannguli_u9kavn.mp3",
    lyrics: `Main toh bas teri chahat mein,
    Chahoon rehna sada`,
    comment: "Saranya, every time I hear this, I can’t help but think of us dancing under the stars."
    },
  // Additional songs can be added here
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

function Footer() {
  return (
    <footer className="bg-white/10 backdrop-blur-lg text-white py-6 mt-12">
      <div className="container mx-auto px-4 text-center">
        <p className="text-purple-200 text-sm">
          Created with ❤️ by <span className="text-pink-300 font-semibold">Karan Kaul</span>
        </p>
        <p className="text-purple-200 text-sm mt-1">
          Dedicated to the love of <span className="text-pink-300 font-semibold">Saranya</span>
        </p>
        <p className="text-purple-200 text-xs mt-4">
          &copy; {new Date().getFullYear()} All Rights Reserved.
        </p>
      </div>
    </footer>
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
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {songs.map((song) => (
              <div
                key={song.id}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-white shadow-xl
                         hover:transform hover:scale-[1.02] transition-all duration-300 flex flex-col space-y-4"
              >
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
                  <div className="flex items-center mb-2">
                    <Heart className="text-pink-300 w-5 h-5 mr-2" />
                    <h4 className="text-xl font-medium">Why This Song Is Special</h4>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 max-h-35 overflow-y-auto">
                    <p className="text-purple-100 whitespace-pre-line">{song.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;

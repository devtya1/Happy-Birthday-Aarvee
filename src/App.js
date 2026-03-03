import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import aarveePic from "./assets/aarvee.jpeg";
import Confetti from "react-confetti";
import img1 from "./assets/album/1.jpeg";
import img2 from "./assets/album/2.jpeg";
import img3 from "./assets/album/3.jpeg";
import img4 from "./assets/album/4.jpeg";
import img5 from "./assets/album/5.jpeg";
import img6 from "./assets/album/6.jpeg";
import img7 from "./assets/album/7.jpeg";
import img8 from "./assets/album/8.jpeg";
import img9 from "./assets/album/9.jpeg";
import img10 from "./assets/album/10.jpeg";
import img11 from "./assets/album/11.jpeg";
import img12 from "./assets/album/12.jpeg";
import img13 from "./assets/album/13.jpeg";
import img14 from "./assets/album/14.jpeg";
import img15 from "./assets/album/15.jpeg";
import img16 from "./assets/album/16.jpeg";
import img17 from "./assets/album/17.jpeg";
import img18 from "./assets/album/18.jpeg";

function App() {
  const [page, setPage] = useState(1);
  const [showContent, setShowContent] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [openLetter, setOpenLetter] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [showAudioNext, setShowAudioNext] = useState(false);
  const audioPlayerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAlbumNext, setShowAlbumNext] = useState(false);
  const [albumPage, setAlbumPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  const audioRef = useRef(null);
  const memoriesAudioRef = useRef(null);

  const albumImages = [
  img1, img2, img3, img4, img5,
  img6, img7, img8, img9, img10,
  img11, img12, img13, img14, img15,
  img16, img17, img18
];

  const letterText = `
My Dearest Aarvee 💖

Happy Birthday to the most precious, softest, brightest soul I have ever known.

I genuinely don’t know how my life became so lucky to have you in it. 
You are not just my best friend — you are my comfort place, my safe corner, my calm during chaos, and my biggest source of happiness.

Every laugh we share, every silly conversation, every random late night talk means more to me than you will ever understand. 
You make ordinary days feel special just by existing in them.

You are the kindest heart, the warmest hug, the purest energy. 
The way you care, the way you listen, the way you just *are* — it makes the world softer.

I hope this year brings you the same joy you bring into my life every single day.
I hope you achieve everything you dream of.
I hope you never forget how loved, valued, and deeply appreciated you are.

Thank you for being my person.
Thank you for trusting me.
Thank you for choosing me as your best friend.

No matter where life takes us,
no matter how much time passes,
I’ll always be right here —
cheering for you, supporting you, loving you endlessly.

You deserve the entire universe, Aarvee.
And today, the universe celebrates YOU.

Forever your best friend,
with the biggest heart full of love 💗`;

  const playMusic = () => {
  audioRef.current = new Audio("/birthday.mp3");
  audioRef.current.loop = true;
  audioRef.current.play();
};

const togglePlay = () => {
  if (!audioPlayerRef.current) return;

  if (isPlaying) {
    audioPlayerRef.current.pause();
  } else {
    audioPlayerRef.current.play();
  }
  setIsPlaying(!isPlaying);
};

const forward10 = () => {
  audioPlayerRef.current.currentTime += 10;
};

const rewind10 = () => {
  audioPlayerRef.current.currentTime -= 10;
};

  const handleClick = () => {
    setShowContent(true);
    playMusic();

    setTimeout(() => {
      setShowNext(true);
    }, 7000);
  };

  useEffect(() => {
  if (openLetter) {
    let i = 0;
    const typing = setInterval(() => {
      setTypedText((prev) => prev + letterText[i]);
      i++;
      if (i === letterText.length) {
        clearInterval(typing);
        setTimeout(() => {
          setShowAudioNext(true);
        }, 2000); // shows button after letter finishes
      }
    }, 40);
  }
}, [openLetter, letterText]);

useEffect(() => {
  if (page === 4) {
    memoriesAudioRef.current = new Audio("/song.mp3");

    memoriesAudioRef.current.currentTime = 107; // 1 min 47 sec
    memoriesAudioRef.current.play();

    // optional: if you want it to continue normally
    memoriesAudioRef.current.loop = false;
  }
}, [page]);

  return (
    <div className="app">
      {page === 1 && (
        <div className="intro">

          {!showContent && (
            <button className="click-btn" onClick={handleClick}>
              Click Mee 💖
            </button>
          )}

          <div className={`curtain left ${showContent ? "open-left" : ""}`}></div>
          <div className={`curtain right ${showContent ? "open-right" : ""}`}></div>

          {showContent && (
            <>
              <Confetti numberOfPieces={300} />

              <div className="center-content">
                <img src={aarveePic} alt="Aarvee" className="profile-pic" />
                <h1>Happy Birthday Aarvee 💗</h1>
              </div>
            </>
          )}

          {showNext && (
            <button className="next-btn"
  onClick={() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setPage(2);
  }}
>Next!💖</button>
          )}
        </div>
      )}

      {page === 2 && (
  <div className="letter-page">

    <div
      className={`envelope-wrapper ${openLetter ? "flipped" : ""}`}
      onClick={() => setOpenLetter(true)}
    >
      <div className="envelope">
        <div className="front"></div>
        <div className="flap"></div>
      </div>
    </div>

    {openLetter && (
      <div className={`letter ${openLetter ? "show-letter" : ""}`}>
        <pre>{typedText}</pre>
      </div>
    )}

    {showAudioNext && (
  <button
    className="next-btn"
    style={{ position: "absolute", bottom: "5%" }}
    onClick={() => setPage(3)}
  >
    One More Thing 🎧
  </button>
)}

  </div>
)}

{page === 3 && (
  <div className="audio-page">
    <h1>A Little Something From Me 💗</h1>

    <div className="audio-card">
      <p>Close your eyes and listen… 🎙✨</p>

      {/* DJ STYLE BARS */}
      <div className="visualizer">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className={`bar ${isPlaying ? "animate" : ""}`}
            style={{ animationDelay: `${i * 0.05}s` }}
          ></div>
        ))}
      </div>

      {/* HIDDEN AUDIO */}
      <video
  ref={audioPlayerRef}
  src="/voice.mp4"
  style={{ display: "none" }}
  onEnded={() => {
    setIsPlaying(false);
    setShowAlbumNext(true);
  }}
/>

      {/* CUSTOM CONTROLS */}
      <div className="controls">
        <button onClick={rewind10}>⏪ 10s</button>
        <button onClick={togglePlay}>
          {isPlaying ? "⏸ Pause" : "▶ Play"}
        </button>
        <button onClick={forward10}>10s ⏩</button>
      </div>

      {showAlbumNext && (
  <button
    className="next-btn"
    style={{ marginTop: "30px" }}
    onClick={() => setPage(4)}
  >
    Open Memories 📸
  </button>
)}
    </div>
  </div>
)}

{page === 4 && (
  <div className="album-page">
    <h1>Some Beautiful Moments 💗</h1>

    <div className="collage">
  {albumImages
    .slice((albumPage - 1) * 4, albumPage * 4)
    .map((img, index) => (
      <div
        className="photo-card"
        key={index}
        onClick={() => setSelectedImage(img)}
      >
        <img src={img} alt="memory" />
      </div>
    ))}
</div>

    <div className="album-controls">
      {albumPage > 1 && (
        <button onClick={() => setAlbumPage(albumPage - 1)}>
          ⬅ Previous
        </button>
      )}

      {albumPage * 4 < albumImages.length && (
        <button onClick={() => setAlbumPage(albumPage + 1)}>
          Next ➡
        </button>
      )}

      <button
  className="next-btn"
  style={{ marginTop: "25px" }}
  onClick={() => {
    if (memoriesAudioRef.current) {
      memoriesAudioRef.current.pause();
      memoriesAudioRef.current.currentTime = 0;
    }
    setPage(5);
  }}
>
  One Last Thing 💖
</button>
    </div>

    {selectedImage && (
  <div className="image-modal">
    <button
      className="close-btn"
      onClick={() => setSelectedImage(null)}
    >
      ✖
    </button>
    <img src={selectedImage} alt="expanded" />
  </div>
)}
  </div>
)}

{page === 5 && (
  <div className="final-page">
    <div className="hearts-bg"></div>

    <h1 className="final-text">
      Once Again... 💗
    </h1>

    <h2 className="big-message">
      Happy Birthday My Princess 👑✨
    </h2>

    <p className="final-sub">
      You are my favorite chapter, my safest place,
      and the most beautiful part of my life.
      <br /><br />
      May your smile never fade,
      and may happiness chase you forever.
      <br /><br />
      I’ll always be right here.
      Always.
    </p>
  </div>
)}
    </div>
  );
}

export default App;

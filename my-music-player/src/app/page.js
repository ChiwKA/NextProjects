"use client"

import Dashboard from './components/Dashboard/Dashboard';
import Playlist from './components/Playlist/Playlist';
import songs from './song-data';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [songId, setSongId] = useState(0);
  const [isShuffled, setIsShuffled] = useState(JSON.parse(localStorage.getItem("isShuffled")) || false)
  
  const songActiveRef = useRef(null)
  const randomRef = useRef([])

  useEffect(() => {
    setTimeout(() => {
      songActiveRef.current.scrollIntoView({
        behavior:'smooth',
        block:'end',
        inline:'center'
      })
    }, 1000)
  }, [songId])

  const handlePreviousSong = function () {
    if (isShuffled) {
      if (randomRef.current.length === songs.length) {
        randomRef.current = []
      } else {
        let randomIndex
        do {
          randomIndex = Math.floor(Math.random() * songs.length)
        } while (randomIndex === songId || randomRef.current.includes(randomIndex))
        randomRef.current.push(randomIndex)
        setSongId(randomIndex)
      }
    } else {
      if (songId === 0) {
        setSongId(songs.length - 1);
      } else {
        setSongId(songId - 1);
      }
    }
  };
  const handleNextSong = function() {
    if (isShuffled) {
      if (randomRef.current.length === songs.length) {
        randomRef.current = []
      } else {
        let randomIndex
        do {
          randomIndex = Math.floor(Math.random() * songs.length)
        } while (randomIndex === songId || randomRef.current.includes(randomIndex))
        randomRef.current.push(randomIndex)
        setSongId(randomIndex)
      }
    } else {
      if (songId === songs.length - 1) {
        setSongId(0)
      } else {
        setSongId(songId + 1)
      }
    }
  }
  const handleSongShuffle = () => {
    setIsShuffled(!isShuffled)
    localStorage.setItem("isShuffled", JSON.stringify(!isShuffled))
  }

  const selectSong = (id) => {
    setSongId(id)
  }

  return (
   <main>
      <Dashboard songId={songId} onPreviousSong={handlePreviousSong} onNextSong={handleNextSong} isShuffled={isShuffled} handleSongShuffle={handleSongShuffle} />
      <Playlist songId={songId} selectSong={selectSong} ref={songActiveRef} />
   </main>
  );
}

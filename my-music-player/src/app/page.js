"use client"

import Dashboard from './components/Dashboard/Dashboard';
import Playlist from './components/Playlist/Playlist';
import songs from './song-data';
import { useState } from 'react';

export default function Home() {
  const [songId, setSongId] = useState(0);

  const handlePreviousSong = function () {
    if (songId === 0) {
      setSongId(songs.length - 1);
    } else {
      setSongId(songId - 1);
    }
  };
  const handleNextSong = function() {
    if (songId === songs.length - 1) {
      setSongId(0)
    } else {
      setSongId(songId + 1)
    }
  }

  const selectSong = (id) => {
    setSongId(id)
  }

  return (
   <main>
      <Dashboard songId={songId} onPreviousSong={handlePreviousSong} onNextSong={handleNextSong} />
      <Playlist songId={songId} selectSong={selectSong} />
   </main>
  );
}

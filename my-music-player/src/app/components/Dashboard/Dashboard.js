"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRepeat,
  faPlay,
  faVolumeLow,
  faBackwardStep,
  faPause,
  faVolumeHigh,
  faForwardStep,
  faShuffle,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Dashboard.module.css";
import clsx from "clsx";
import { useRef, useState } from "react";

export default function Dashboard({ songs }) {
  const [songId, setSongId] = useState(0);
  const [progress, setProgress] = useState(0)
  const [isRepeated, setIsRepeated] = useState(false);
  const [isPlayed, setIsPlayed] = useState(false)
  const [isShuffled, setIsShuffle] = useState(false)

  const audioRef = useRef(null)
  const intervalRef = useRef(null)

  const handleRepeat = function () {
    setIsRepeated(!isRepeated);
  };
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
  const handleSongToggle = () => {
    const nextIsPlaying = !isPlayed
    setIsPlayed(nextIsPlaying)
    if (nextIsPlaying) {
      audioRef.current.play()
      intervalRef.current = setInterval(() => {
        setProgress(getPercentageProgressBar())
      }, 1000);
    } else {
      audioRef.current.pause()
      clearInterval(intervalRef.current)
    }
  }
  const handleSongShuffle = () => {
    setIsShuffle(!isShuffled)
  }

  const getPercentageProgressBar = () => {
    let percent = audioRef.current.currentTime * 100 / audioRef.current.duration
    console.log(percent)
    return percent.toFixed()
  }

  return (
    <div className={styles.dashboard}>
      <header>
        <h4>Now playing:</h4>
        <h2>{songs[songId].title}</h2>
      </header>
      <div className={styles.cd}>
        <div
          className={styles["cd-thumbnail"]}
          style={{
            backgroundImage: songs[songId].image,
          }}
        ></div>
      </div>
      <div className={styles.control}>
        <div className={styles["control-buttons"]}>
          <button
            className={clsx(styles.btn, { [styles.active]: isRepeated })}
            onClick={handleRepeat}
            type="button"
            title="Repeat"
          >
            <FontAwesomeIcon icon={faRepeat} />
          </button>
          <button
            className={clsx(styles.btn)}
            onClick={handlePreviousSong}
            type="button"
            title="Back"
          >
            <FontAwesomeIcon icon={faBackwardStep} />
          </button>
          <button
            type="button"
            className={clsx(styles.btn)}
            title="Turn down volume"
          >
            <FontAwesomeIcon icon={faVolumeLow} />
          </button>
          {!isPlayed && <button type="button" className={styles.btn} title="Play" onClick={handleSongToggle}>
            <FontAwesomeIcon icon={faPlay} />
          </button>}
          {isPlayed && <button type="button" className={styles.btn} title="Pause" onClick={handleSongToggle}>
            <FontAwesomeIcon icon={faPause} />
          </button>}
          <button type="button" className={styles.btn} title="Turn up volume">
            <FontAwesomeIcon icon={faVolumeHigh} />
          </button>
          <button type="button" className={styles.btn} title="Next" onClick={handleNextSong}>
            <FontAwesomeIcon icon={faForwardStep} />
          </button>
          <button type="button" className={clsx(styles.btn, { [styles.active]: isShuffled })} title="Shuffle playlist" onClick={handleSongShuffle}>
            <FontAwesomeIcon icon={faShuffle} />
          </button>
        </div>
        <input
          type="range"
          className={styles["progress-bar"]}
          value={progress}
        />
        <audio ref={audioRef} src={songs[songId].path}></audio>
      </div>
    </div>
  );
}

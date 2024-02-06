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
import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import songs from "@/app/song-data";

export default function Dashboard({ songId, onPreviousSong, onNextSong }) {
  const [progress, setProgress] = useState(0)
  const [isRepeated, setIsRepeated] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false)
  const [isShuffled, setIsShuffle] = useState(false)

  const audioRef = useRef(null)
  const intervalRef = useRef(null)
  const cdRef = useRef(null)

  useEffect(() => {
    audioRef.current.addEventListener('ended', handleAudioEnded) 
  }, [])

  useEffect(() => {
    const cdAnimation = anime({
      targets: cdRef.current,
      rotate: '+=1turn',
      duration: 10000,
      loop: true,
      easing: 'linear'
    })
    cdAnimation.pause()
    if (isPlaying) {
      cdAnimation.play()
    }
    return () => {
      cdAnimation.pause()
    }
  }, [isPlaying])

  const handleAudioEnded = () => {
    setIsPlaying(false)
    setProgress(0)
    clearInterval(intervalRef.current)
  }
  const handleRepeat = function () {
    setIsRepeated(!isRepeated);
  };
  const handleSongToggle = () => {
    const nextIsPlaying = !isPlaying
    setIsPlaying(nextIsPlaying)
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
  const handleProgressChange = (e) => {
    setProgress(e.target.value)
    audioRef.current.currentTime = e.target.value * audioRef.current.duration / 100
  }

  const getPercentageProgressBar = () => {
    let percent = audioRef.current.currentTime * 100 / audioRef.current.duration
    return percent.toFixed()
  }

  return (
    <div className={styles.dashboard}>
      <header>
        <h4>Now playing:</h4>
        <h2>{songs[songId].title}</h2>
      </header>
      <div className={styles.cd} ref={cdRef}>
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
            onClick={onPreviousSong}
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
          {!isPlaying && <button type="button" className={styles.btn} title="Play" onClick={handleSongToggle}>
            <FontAwesomeIcon icon={faPlay} />
          </button>}
          {isPlaying && <button type="button" className={styles.btn} title="Pause" onClick={handleSongToggle}>
            <FontAwesomeIcon icon={faPause} />
          </button>}
          <button type="button" className={styles.btn} title="Turn up volume">
            <FontAwesomeIcon icon={faVolumeHigh} />
          </button>
          <button type="button" className={styles.btn} title="Next" onClick={onNextSong}>
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
          onInput={handleProgressChange}
        />
        <audio ref={audioRef} src={songs[songId].path}></audio>
      </div>
    </div>
  );
}

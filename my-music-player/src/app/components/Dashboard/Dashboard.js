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
  faHandPointRight,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Dashboard.module.css";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import songs from "@/app/song-data";

export default function Dashboard({ songId, onPreviousSong, onNextSong, isShuffled, handleSongShuffle }) {
  const [progress, setProgress] = useState(0)
  const [isRepeated, setIsRepeated] = useState(JSON.parse(localStorage.getItem('isRepeated')) || false);
  const [isPlaying, setIsPlaying] = useState(false)
  const [cdWidth, setCdWidth] = useState(200)
  const [cdOpacity, setCdOpacity] = useState(1)

  const audioRef = useRef(null)
  const cdRef = useRef(null)
  const animationRef = useRef(null)
  const volumeRef = useRef(1)

  useEffect(() => {
    window.addEventListener('scroll', handleCdScroll)
    animationRef.current = anime({
      targets: cdRef.current,
      rotate: '+=1turn',
      duration: 10000,
      loop: true,
      easing: 'linear'
    })
    animationRef.current.pause()
  }, [])
  
  useEffect(() => {
    if (isPlaying) {
      animationRef.current.play()
    }
    return () => {
      animationRef.current.pause()
    }
  }, [isPlaying])

  const handleCdScroll = () => {
    const scrollTop = window.scrollY 
    setCdWidth(scrollTop < 200 ? 200 - scrollTop : 0)
    setCdOpacity(parseInt(cdRef.current.style.width) / 200)
  }
  const handleAudioEnded = () => {
    if (isRepeated) {
      setProgress(0)
      audioRef.current.play()
    } else {
      setIsPlaying(false)
      setProgress(0)
      animationRef.current.restart()
    }
  }
  const handleRepeat = function () {
    setIsRepeated(!isRepeated);
    localStorage.setItem('isRepeated', JSON.stringify(!isRepeated))
  };
  const handleSongToggle = () => {
    const nextIsPlaying = !isPlaying
    setIsPlaying(nextIsPlaying)
    if (nextIsPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }
  const handleProgressChange = (e) => {
    setProgress(e.target.value)
    audioRef.current.currentTime = e.target.value * audioRef.current.duration / 100
  }
  const handleVolumeUp = () => {
    volumeRef.current += 0.1
    audioRef.current.volume = volumeRef.current
  }
  const handleVolumeDown = () => {
    volumeRef.current -= 0.1
    audioRef.current.volume = volumeRef.current
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
      <div className={styles.cd} ref={cdRef} style={{ width: `${cdWidth}px`, opacity: cdOpacity }}>
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
            onClick={handleVolumeDown}
          >
            <FontAwesomeIcon icon={faVolumeLow} />
          </button>
          {!isPlaying && <button type="button" className={styles.btn} title="Play" onClick={handleSongToggle}>
            <FontAwesomeIcon icon={faPlay} />
          </button>}
          {isPlaying && <button type="button" className={styles.btn} title="Pause" onClick={handleSongToggle}>
            <FontAwesomeIcon icon={faPause} />
          </button>}
          <button type="button" className={styles.btn} title="Turn up volume" onClick={handleVolumeUp}>
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
        <audio ref={audioRef} src={songs[songId].path} onEnded={handleAudioEnded} onTimeUpdate={() => {setProgress(getPercentageProgressBar())}}></audio>
      </div>
    </div>
  );
}

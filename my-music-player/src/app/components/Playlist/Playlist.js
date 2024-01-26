import styles from './Playlist.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'

export default function Playlist({ songs }) {
    return (
        <div className={styles.playlist}>
            {songs.map(song => (
                <div key={song.id} className={styles.song}>
                    <div className={styles['song__thumbnail']} style={{ backgroundImage: song.image }}></div>
                    <div className={styles['song__body']}>
                        <h3 className={styles['song__name']}>{song.title}</h3>
                        <p className={styles['song__singer']}>{song.artist}</p>
                    </div>
                    <div className={styles.option}>
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                    </div>
                </div>
            ))}
        </div>
    ) 
} 
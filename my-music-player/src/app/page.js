import Dashboard from './components/Dashboard/Dashboard';
import Playlist from './components/Playlist/Playlist';
import songs from './song-data';

export default function Home() {
  return (
   <main>
      <Dashboard songs={songs} />
      <Playlist songs={songs} />
   </main>
  );
}

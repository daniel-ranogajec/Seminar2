import { Playlist } from "./Playlist"

export const Playlists = ({ playlists, onOpen, onDeletePlaylist} ) => {

  return (
	<>
			{playlists.map((playlist) => (
				<Playlist key={playlist._id} playlist={playlist} onOpen={onOpen} onDeletePlaylist={onDeletePlaylist} />
			))}
		</>
  )
}

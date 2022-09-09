import { FaTimes } from "react-icons/fa"
import { Link } from "react-router-dom"

export const Playlist = ({ playlist, onOpen, onDeletePlaylist }) => {
  return (
	<div className="playlist">
		<div>
		<Link to={`/playlist/${playlist._id}`} onClick={() => onOpen(playlist._id)} style={{ textDecoration: 'none' }}><h3>{playlist.title}</h3></Link>
		</div>
		<div>

		</div>
		<div>
		<FaTimes style={{position:"relative", right:"-220px", top:"3px"}} onClick={() => onDeletePlaylist(playlist._id)}/>
		</div>
	</div>
  )
}

import { FaTimes, FaPlay } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const Video = ({ video, onDelete }) => {

	const params = useParams()	
	return (
		<div className='video'>
			<img src={video.thumbnail} alt='Thumbnail'/>
			<h3>{video.title}</h3>
			<div className='videoButtons'>
				<Link to={`/video/${video.id}`} style={{ textDecoration: 'none' }}><FaPlay /></Link>
				<FaTimes onClick={() => onDelete(video.id, params.id)}/>
			</div>
		</div>
	)
}

export default Video

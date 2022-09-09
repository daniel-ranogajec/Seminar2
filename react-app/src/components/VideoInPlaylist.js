import { FaTimes } from "react-icons/fa"

const Video = ({ video, onPlay, onDelete }) => {

	return (
		<div className='video'>
			<img src={video.thumbnail} alt='Thumbnail' onClick={() => onPlay(video.id)}/>
			<h3 onClick={() => onPlay(video.id)}>{video.title}</h3>
			<FaTimes onClick={() => onDelete(video.id)}/>
		</div>
	)
}

export default Video

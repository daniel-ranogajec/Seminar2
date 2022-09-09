import { useParams } from "react-router-dom"
import YouTube from 'react-youtube';
import VideoInPlaylist from "./VideoInPlaylist";
import { useState } from 'react'


const VideoPlayer = ({ videos }) => {
	const { id } = useParams();
	const [vids, setVids] = useState(videos.filter(video => video.id !== id))
	const [vidId, setVidId] = useState(id)

	const opts = {
		width: 540,
		height: 400,
		playerVars: {
			autoplay: 1,
		},
	}

	const onEnd = async (event) => {
		if (vids[0] !== undefined) {
			setVidId(vids[0].id)
			setVids(vids.filter(video => video.id !== vids[0].id))
		}
	}

	const onPlay = (videoId) => {
		setVidId(videoId)
		setVids(vids.filter(video => video.id !== videoId))
	}

	const onDelete = (videoId) => {
		setVids(vids.filter(video => video.id !== videoId))
	}

	return (
		<div>
			<YouTube videoId={vidId} opts={opts} onEnd={onEnd}/>
			<br />
			<hr />
			<br />
			{vids[0] !== undefined ? (<h3>Playing next:</h3>) : (<h3>The queue is empty!</h3>)}
			<>
			{vids.map((video) => (
				<VideoInPlaylist key={video.id} video={video} onPlay={onPlay} onDelete={onDelete}/>
			))}
		</>
		</div>
	)
}

export default VideoPlayer

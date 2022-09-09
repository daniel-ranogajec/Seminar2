import Video from './Video'

const Videos = ({ videos, onDelete }) => {

	return (
		<>
			{videos.map((video) => (
				<Video key={video._id} video={video} onDelete={onDelete}/>
			))}
		</>
	)
}

export default Videos

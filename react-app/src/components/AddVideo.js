import { useState } from "react"
import { useParams } from 'react-router-dom'

export const AddVideo = ({ onAdd }) => {
	const [Title, setTitle] = useState('')
	const params = useParams()

	const onSubmit = (e) => {
		e.preventDefault()
		
		if(Title) {
			var Playlist = params.id
			onAdd({ Title, Playlist })
			setTitle('')
		}
	}

	return (
		<form className='add-form' onSubmit={onSubmit}>
			<div className='form-control'>
				<label>Add New Video To Playlist:</label>
				<input type='text' placeholder='Search' value={Title} onChange={(e) => setTitle(e.target.value)}/>
			</div>
			<input type='submit' className='btn btn-block' value='Add video' />
		</form>
	)
}

export default AddVideo
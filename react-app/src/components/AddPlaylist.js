import { useState } from "react"

export const AddPlaylist = ({ onAdd }) => {
	const [Title, setTitle] = useState('')

	const onSubmit = (e) => {
		e.preventDefault()
		
		if(Title) {
			onAdd({ Title })
			setTitle('')
		}
	}

	return (
		<form className='add-form' onSubmit={onSubmit}>
			<div className='form-control'>
				<label>Create A New Playlist:</label>
				<input type='text' placeholder='Title' value={Title} onChange={(e) => setTitle(e.target.value)}/>
			</div>

			<input type='submit' className='btn btn-block' value='Create Playlist' />
		</form>
	)
}

export default AddPlaylist
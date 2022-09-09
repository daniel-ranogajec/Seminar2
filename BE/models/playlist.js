const mongoose = require('mongoose')
const Schema = mongoose.Schema

const playlistSchema = new Schema({
	userID: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	videos: {
		type: Array,
	}
}, {timestamps: true});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const videoSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	id: {
		type: String,
		required: true,
		unique: true
	},
	description: {
		type: String,
		required: true
	},
	thumbnail: {
		type: String
	},
	publishedAt: {
		type: String
	}
}, {timestamps: true});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
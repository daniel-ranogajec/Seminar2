var express = require('express');
var router = express.Router();
const Video = require('../models/video')
const Playlist = require('../models/playlist')
const fetch = require("node-fetch");

router.get('/', function(req, res, next) {
  Video.find().then((result) => {
		res.send(result)
	}).catch((err) => console.log(err))
});

router.get('/playlist', function(req, res, next) {
  Playlist.find().then((result) => {
		res.send(result)
	}).catch((err) => console.log(err))
});


router.post('/search', function(req, res, next) {
  var video
  getVideo(req.body.Title).then(data => {
    video = new Video({
      title: data.items[0].snippet.title,
      id: data.items[0].id.videoId,
      description: data.items[0].snippet.description,
      thumbnail: data.items[0].snippet.thumbnails.default.url,
      publishedAt: data.items[0].snippet.publishTime
    })
    Playlist.updateOne({_id: req.body.Playlist}, {$addToSet: {videos: video}})
      .then(() => res.send(video))
      
  })
});




router.post('/remove', function(req, res, next) {
  Playlist.updateOne({_id: req.body.Playlist}, {$pull: {videos: {id: req.body.VideoId}}}).then((result) => {
		res.send(result)
	}).catch((err) => console.log(err))
});

router.post('/deletePlaylist', function(req, res, next) {
  Playlist.deleteOne({"id": req.body.Playlist}).then((result) => {
		res.send(result)
	}).catch((err) => console.log(err))
});

router.get('/playlist/:id', function(req, res, next) {
  Playlist.find({_id: req.params.id}).then((result) => {
		res.send(result)
	}).catch(() => res.send("Playlist not found!"))
});

router.get('/user/:id', function(req, res, next) {
  Playlist.find({userID: req.params.id}).then((result) => {
		res.send(result)
	}).catch(() => res.send("Playlist not found!"))
});

router.get('/video/:id', function(req, res, next) {
  Video.find({id: req.params.id}).then((result) => {
		res.send(result)
	}).catch(() => res.send("Video not found!"))
});



router.post('/createPlaylist', function(req, res, next) {
    new Playlist({
      userID: req.body.UserID,
      title: req.body.Title,
      videos: []
    }).save().then((result) => {
      res.send(result)
    }).catch((err) => {console.log(err)})
});

async function getVideo(title) {
	const response = await fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + encodeURI(title) + '&key=AIzaSyC0ku6PZlOYfyf1F6Xyad5x_D3TwNrywmg')
	return response.json()
}

module.exports = router;

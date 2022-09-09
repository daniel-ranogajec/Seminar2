import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import Videos from './components/Videos'
import AddVideo from './components/AddVideo'
import VideoPlayer from './components/VideoPlayer'
import { Playlists } from './components/Playlists'
import AddPlaylist from './components/AddPlaylist'
import FbLogin from './components/FbLogin'
import Footer from './components/Footer'

const App = () => {


  const [videos, setVideos] = useState([])
  const [playlists, setPlaylists] = useState([])
  const [title, setTitle] = useState('Youtube Video Player')
  const [user, setUser] = useState(window.localStorage.getItem("user") === null ? (null) : (window.localStorage.getItem("user").replace(/['"]+/g, '')))

  useEffect(() => {
    var usr = window.localStorage.getItem("user") === null ? (null) : (window.localStorage.getItem("user").replace(/['"]+/g, ''))
    const getPlaylists = async () => {
      if (usr) {
        const playlists = await fetchPlaylists(usr)
        setPlaylists(playlists)
      }
    }

    getPlaylists()
  }, [])
  
  

  const fetchPlaylists = async (usr) => {
    const res = await fetch(`http://localhost:8000/user/${usr}`)
    const data = await res.json()
    return data
  }

  const onOpen = async (id) => {

    const res = await fetch(`http://localhost:8000/playlist/${id}`)
    const data = await res.json()
    setVideos(data[0].videos)
    setTitle(data[0].title)
  }


  const deleteVideo = async (videoId, playlistId) => {
    const data = {"VideoId": videoId, "Playlist": playlistId}
    await fetch('http://localhost:8000/remove', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    setVideos(videos.filter((video) => video.id !== videoId))
  }

  const deletePlaylist = async (playlistId) => {
    const data = {"Playlist": playlistId}
    await fetch('http://localhost:8000/deletePlaylist', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    setPlaylists(playlists.filter((playlist) => playlist._id !== playlistId))
  }

  const searchVideo  = async (video) => {
    const res = await fetch("http://localhost:8000/search", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(video),
    })

    const data = await res.json()
    if (data.data === "duplicate") {
      alert(data.title + " is already on the list!")
    } else {
      setVideos([...videos, data])
    }
  }

  const createPlaylist = async (playlist) => {
    playlist.UserID = user
    const res = await fetch("http://localhost:8000/createPlaylist", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(playlist),
    })

    const data = await res.json()
    setPlaylists([...playlists, data])
  }
  
  const onLogin = async (data) => {
    setUser(data.userID)
    window.localStorage.setItem("user", JSON.stringify(data.userID))
    const playlists = await fetchPlaylists(data.userID)
    setPlaylists(playlists)
  }
  
  return (
    <Router>
      <Switch>
        <div className="container">
          <Header title={title} />
          <br />
          <hr />
          <br />
              <Route path='/' exact render={(props) => (<>
              {user === null ? (<><FbLogin onLogin={onLogin}/></>):(
                <><AddPlaylist onAdd={createPlaylist}/>
                <Playlists playlists={playlists} onOpen={onOpen} onDeletePlaylist={deletePlaylist}/></>
              )}
              </>)}/>
              <Route path='/video/:id' exact render={(props) => (<>
              {user === null ? (<><FbLogin onLogin={onLogin}/></>):(
                <>
                <VideoPlayer videos={videos}/>
                <br />
                <Footer />
                </>
              )}
              </>)}/>
              <Route path='/playlist/:id' exact render={(props) => (<>
                {user === null ? (<><FbLogin onLogin={onLogin}/></>):(
                <>
                <AddVideo onAdd={searchVideo}/>
                <Videos videos={videos} onDelete={deleteVideo}/>
                <br></br>
                <br></br>

                <hr></hr>
                <br></br>

                <AddPlaylist onAdd={createPlaylist}/>
                <Playlists playlists={playlists} onOpen={onOpen} onDeletePlaylist={deletePlaylist}/>
              </>)}
              </>)}/>              
        </div>
        </Switch>
    </Router>
  );
}

export default App;

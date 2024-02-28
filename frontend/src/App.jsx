import 'react'
import  {BrowserRouter as Router, Route} from 'react-router-dom'
// Swithc -> Routes
import {Routes} from 'react-router-dom'
import './App.css'
import VideoUpload from './components/VideoUpload'
import VideoPlayer from './components/VideoPlayer'


function App() {

  return (
    // <input id="icon_prefix" type="text" className="validate" />
    <Router>
      <Routes>
        <Route path='/' Component={VideoUpload}></Route>
        <Route path='/Player' Component={VideoPlayer}></Route>
      </Routes>
    </Router>
  )
}

export default App

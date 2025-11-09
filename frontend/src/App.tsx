import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Predictions from './pages/prediction'
import Map from './pages/map'
import History from './pages/history'

function App() {

  return (
    <>
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/predictions" element={<Predictions />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </Router>
    </>
  )
}

export default App

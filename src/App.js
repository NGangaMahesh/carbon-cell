import {Routes, Route} from 'react-router-dom'
import Home from './Components/Home'
import Prices from './Components/Prices'
import About  from './Components/About'

const App = () => (
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/prices' element={<Prices />} />
    <Route path='/about' element={<About />} />
  </Routes>
)

export default App
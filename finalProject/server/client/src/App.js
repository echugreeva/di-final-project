import {useState, createContext} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom'
import LogReg from './components/LogReg';
import Team from './components/Team'
import Welcome from './components/Welcome';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
// import Nav from './components/Nav';
// import Users from './components/Users';
// import Home from './components/Home';
import {Auth} from './components/auth/Auth'
import MyCabinet from './components/Cabinet/MyCabinet';
import { ThemeProvider } from '@mui/material';
import Theme from './Theme'

export const AppContext = createContext();

function App() {
  const [userId, setId]= useState('')
  const [teamId, setTeam]= useState('')
  const [tLId, setTL]= useState('')
  const [accessToken, setAccessToken] = useState('');
  const [lBlistener, setListener] = useState(0)
  return (
     <AppContext.Provider value={{setId, userId,  setTeam,  teamId, setTL, tLId, accessToken, setAccessToken,lBlistener, setListener}}>
      <ThemeProvider theme={Theme}>
      <div className="App">
      {/* <Nav/> */}
     <Navbar/>
      <Routes>
        <Route path='/' element={<Welcome/>}/>
        <Route path='/login' element={<LogReg title={'Login'}/>}/>
        <Route path='/register' element={<LogReg title={'Register'}/>}/>
        <Route path='/team' element={<Auth><Team/></Auth>}/>
        <Route path='/mycabinet' element={<Auth><MyCabinet/></Auth>}/>
       
      </Routes>
      <Footer/>
      </div>
      </ThemeProvider>
     </AppContext.Provider>
  );
}

export default App;
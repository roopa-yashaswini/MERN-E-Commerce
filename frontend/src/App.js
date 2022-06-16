
import './App.css';
import Header from '../src/components/utils/Header'
import UserProvider from './context/UserProvider';
import UserContext from './context/user-context';
import {useContext, useEffect, useState} from 'react';
import Routes from './components/utils/Routes'

function App() {
  
  const ctx = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(ctx.isLoggedIn)
  console.log(ctx.isLoggedIn)
  useEffect(()=>{
    setIsLoggedIn(ctx.isLoggedIn)
  }, [ctx.isLoggedIn])
  return (
    <UserProvider>
      <div className="App" style={{position:'absolute', top: '0px', right: '0px', left: '0px', bottom: '0px'}}>
        <header>
          <Header />
        </header>
        <div style={{marginTop: '4rem', height: '100%'}}>
          <Routes />
        </div>
      </div>
    </UserProvider>
  );
}

export default App;

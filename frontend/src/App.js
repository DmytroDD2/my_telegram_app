
import { useEffect, useState } from 'react';
import './App.css';

import TelegramAuth from './TelegramAuth';

import AuthForm from './AuthForm';
import GetChatsApp from './GetChatsApp/GetChatsApp';


function App({redirect=null}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
  
    if (redirect) {
      setIsLoggedIn(false);
    }
  }, [redirect]);
  
  

    const handleLogin = () => {
        setIsLoggedIn(!isLoggedIn);
    };

  return (
    <div className="App">
      <header className="App-header">
      
      {isLoggedIn ? (
                <GetChatsApp acess={handleLogin}/>  
            ) : (
                <AuthForm acess={handleLogin}/> 
            )}

      </header>
    </div>
  );
}

export default App;

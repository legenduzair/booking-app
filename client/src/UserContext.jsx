import axios from 'axios';
import { createContext } from 'react';
import { useState, useEffect } from 'react';

export const UserContext = createContext({});

const UserContextProvider = ({children}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if(!user) {
      axios.get('/profile').then(({data}) => {
        setUser(data);
      });
    }
  }, [])
  
  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider
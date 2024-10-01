import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
// import EditProfile from './Components/EditProfile/EditProfile'
import { useState } from 'react';
import ProfileCard from './Components/ProfileCard/ProfileCard'
import { ConfirmProvider } from 'material-ui-confirm';


function App() {
const[page, setPage]=useState(false)
  return (
    <div className="App">
      <header className="App-header">
        <nav  className='navbar'>
          <button type='button' onClick={()=>setPage(!page)}>View Profile</button>
        </nav><br/><br/>
        {page &&
        <ConfirmProvider>
          <ProfileCard/>

        </ConfirmProvider>
        
}

      </header>
    </div>
  );
}

export default App;

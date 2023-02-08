import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Home from './Pages/Home'
import Context from './Context';
import { createContext } from 'react';
export const UserContext = createContext()
function App() {
  const {id, setId, email, setEmail, setResumeList,resumeList,setEditDoc,editdoc, productList, setProductList,username, setUsername} = Context()
  const data = {id, setId, email, setEmail, setResumeList,resumeList,setEditDoc,editdoc, productList, setProductList,username, setUsername }
  return (
    <div className="App">
      <UserContext.Provider value={data}>
     
   <Routes>
    <Route path='/Pages/Login' element={<Login/>}/>
    <Route path='/' element={<Login/>}/>
    <Route path='/Pages/SignUp' element={<SignUp/>}/>
    <Route path='/Pages/Home' element={<Home/>}/>
    </Routes>
    </UserContext.Provider>
    </div>
  );
}

export default App;

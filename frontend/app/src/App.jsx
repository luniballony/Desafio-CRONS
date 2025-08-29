import {Link, Routes, Route} from 'react-router-dom'
import Home from "./Home";
import List from './pages/List';
import Create from './pages/Create';
import Edit from './pages/Edit';
import Delete from './pages/Delete';
import NavBar from './components/NavBar';
import EditCron from './pages/EditCron';
import DeleteCron from './pages/DeleteCron';
import ViewCron from './pages/ViewCron';

function App() {
  
  return (
    <div>
     <NavBar />
     <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/list' element={< List />} />
          <Route path='/create' element={< Create />} />
          <Route path='/edit' element={< Edit />} />
          <Route path='/edit/:uriId' element={< EditCron />} />
          <Route path='/delete' element={< Delete />} />          
          <Route path='/delete/:uriId' element={< DeleteCron />} />
          <Route path='/view/:uriId' element={< ViewCron />} />
        </Routes>
     </main>
    </div>
  );
}

export default App;
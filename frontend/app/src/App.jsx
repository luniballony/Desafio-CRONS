import {Link, Routes, Route} from 'react-router-dom'
import Home from "./Home";
import List from './pages/List';
import Create from './pages/Create';
import Edit from './pages/Edit';
import Delete from './pages/Delete';
import NavBar from './components/NavBar';

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
          <Route path='/delete' element={< Delete />} />
        </Routes>
     </main>
    </div>
  );
}

export default App;
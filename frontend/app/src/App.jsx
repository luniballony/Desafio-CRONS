import {Link, Routes, Route} from 'react-router-dom'
import Home from "./Home";
import List from './pages/List';

function App() {
  
  return (
    <div>
     <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/list' element={< List />} />
        </Routes>
     </main>
    </div>
  );
}

export default App;
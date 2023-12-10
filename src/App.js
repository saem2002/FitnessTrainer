import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage';
import Calendar from './components/Calendar';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
function App() {
  const notify = (res) => toast(res, {
    position: toast.POSITION.TOP_CENTER
  });
  return (
    <>        <div>
      <ToastContainer />
    </div>
      <Router>
        <Routes >

          <Route exact path="/" element={<HomePage notify={notify} />} />
          <Route exact path="/Calendar" element={<Calendar notify={notify} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

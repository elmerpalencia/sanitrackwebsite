import Footer from './Components/Footer.jsx'
import Header from './Components/Header.jsx'
import Body from './Components/Body.jsx';
import Admin from './AdminPage.jsx'
import { Routes, Route } from 'react-router-dom';
import './App.css'

function Home() {
  return (
    <>
      <Header />
      <Body />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App
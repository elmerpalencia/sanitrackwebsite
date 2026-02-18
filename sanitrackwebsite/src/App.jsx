import Footer from './Components/Footer.jsx'
import Header from './Components/Header.jsx'
import Body  from './components/Body.jsx';
import { useState, useEffect } from 'react';
import './App.css'

// import { createClient } from "@supabase/supabase-js";
// const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);




function App() {
  
  // const [instruments, setInstruments] = useState([]);

  // useEffect(() => {
  //   getInstruments();
  // }, []);

  // async function getInstruments() {
  //   const { data } = await supabase.from("instruments").select();
  //   setInstruments(data);
  // }



  return (
    <>
      <div>
        <Header/>
      </div>
      <div>
        {/* <h1>Hello Fill this out with admin content (i.e graphs, percentage, and whatnot)</h1> */}
        <Body/ >
      </div>
      <div>
        <Footer />
      </div>
    </>
  )
}

export default App
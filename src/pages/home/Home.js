import React from 'react'
import Navbar from '../Commons/Navbar'

const Home = ({theme, setTheme}) => {
  return (
    <>
     <div className="home">
      
     <button onClick={()=> setTheme(theme==="light"? "dark": "light")}>dark mode</button>



    </div>

    </>
  )
}

export default Home

import React from 'react'
import { NavLink , Link} from 'react-router-dom'
import  '../AllStyles/Nav.css'

function Nav() {
  return (
    <div className='nav'>

        <Link>MedTrack</Link>
        <Link to= 'app'><button>Inventory_Dashboard</button></Link> 

    </div>
  )
}

export default Nav
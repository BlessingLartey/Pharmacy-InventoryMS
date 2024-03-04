
import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import RootLayout from './RootLayout.jsx'
import HomePage from './HomePage.jsx'
import App from '../App.jsx'
import LabLayout from '../LabComponents/screens/LabLayout.jsx'
import HomePage2 from './HomePage2.jsx'
import LabHome from '../LabComponents/screens/LabHome.jsx'
import Dashboard from './Dashboard.jsx'

const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
     <Route  index element={<HomePage />}/>
     <Route path='/signup' element={<HomePage2 />} />
     <Route  path='app' element={<App />}/>
     <Route path='/' element={<LabLayout />}>
      <Route  path='lab' element={<LabHome />}/>
     </Route>


<Route  path='dashboard'  element= {<Dashboard />} > </Route>
    </Route>

))

export default function Hero() {
  return (
 <RouterProvider  router={ router}/>
    )
}

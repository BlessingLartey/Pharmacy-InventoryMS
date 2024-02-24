
import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import RootLayout from './RootLayout.jsx'
import HomePage from './HomePage.jsx'
import App from '../App.jsx'
import HomePage2 from './HomePage2.jsx'

const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
     <Route  index element={<HomePage />}/>
     <Route path='/signup' element={<HomePage2 />} />
     <Route  path='app' element={<App />}/>

    </Route>
))

export default function Hero() {
  return (
 <RouterProvider  router={ router}/>
    )
}

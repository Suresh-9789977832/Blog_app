import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Components/Layout';
import Errorpost from './pages/Errorpost';
import Home from './pages/Home';
import Postdetails from './pages/Postdetails'
import Register from './pages/Register'
import Loginpage from './pages/Loginpage'
import Userprofile from './pages/Userprofile'
import Authors from './pages/Authors'
import Createpost from './pages/Createpost'
import Authorposts from './pages/Authorposts'
import Categoryposts from './pages/Categoryposts'
import Dashboard from './pages/Dashboard'
import Editpost from './pages/Editpost'
import Logout from './pages/Logout'
import Deleteposts from './pages/Deleteposts'
import { Toaster } from 'react-hot-toast';
import Userprovider from './Context/Usercontext';





const router = createBrowserRouter([
  {
    
    path: '/',
    element: <Userprovider><Layout/></Userprovider>,
    errorElement: <Errorpost />,
    children: [
      { index: true, element: <Home /> },
      { path: "posts/:id", element: <Postdetails /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Loginpage /> },
      { path: "profile/:id", element: <Userprofile /> },
      { path: "authors", element: < Authors /> },
      { path: "create", element: <Createpost /> },
      { path: "posts/:id/delete", element: <Deleteposts/> },
      { path: "posts/users/:id", element: < Authorposts/> },
      { path: "posts/categories/:category", element: <Categoryposts /> },
      { path: "myposts/:id", element: < Dashboard /> },
      { path: "posts/:id/edit", element: < Editpost/> },
      { path: "/logout", element: < Logout /> },
      
    ]
  }
])





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App/> */}
  </React.StrictMode>
);

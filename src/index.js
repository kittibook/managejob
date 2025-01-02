import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css"
import "./fonts.css"
import Home from './Admin/Home';
import ManageHome from './Admin/Manage/ManageHome';
import Managesalary from './Admin/Manage/Managesalary';
import ManageAddTicket from './Admin/Manage/ManageAddTicket';
import Managewithdraw1 from './Admin/Manage/Manageuser';
import Alluser from './Admin/Manage/Alluser';
import Login from './login/Login';
import Register from './Register/Register';
import Managereducesalary from './Admin/Manage/ManagereduceSalary';
import Manageaddtype from './Admin/Manage/ManageAddtype';
import Managereduceticket from './Admin/Manage/ManagereduceTicket';
import Manageticket from './Admin/Manage/ManageTicket';
import ManageUser from './Admin/Manage/Manageuser';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/manage",
    element: <ManageHome />,
  },
  {
    path: "/managesalary",
    element: <Managesalary />,
  },
  {
    path: "/manageticket",
    element: <Manageticket />,
  },
  {
    path: "/manageaddticket",
    element: <ManageAddTicket />,
  },
  {
    path: "/managereduceticket",
    element: <Managereduceticket />,
  },
  {
    path: "/manageuser",
    element: <ManageUser />,
  },
  {
    path: "/alluser",
    element: <Alluser />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/managereducesalary",
    element: <Managereducesalary />,
  },
  {
    path: "/manageaddtype",
    element: <Manageaddtype />,
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

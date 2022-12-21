import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // TODO should i do router stuff in this file????????
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import store from './app/store';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import Root from './routes/root';
import Error from './routes/error';
import LoginRoute from './routes/login';
import GameRoute from './routes/game';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "login",
        element: <LoginRoute />
      },
      {
        path: "game",
        element: <GameRoute />
      }
    ]
  }
,
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

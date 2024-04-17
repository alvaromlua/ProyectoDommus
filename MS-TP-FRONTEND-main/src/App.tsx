import React from 'react';
import {
  useRoutes,
} from 'react-router-dom'
import SignInSide from './pages/SignInSide'
import SignIn from './pages/SignIn'
import InitInfo from './pages/InitInfo'
import SignUp from './pages/SignUp';
import SignUpMessage from './pages/SignUpMessage'
import ErrorNotFound from './pages/ErrorNotFound'
import Dashboard from './pages/Dashboard';
import { Inbox } from './components/dashboard/Inbox'
import { Match } from './components/dashboard/Match'
import { Profile } from './components/dashboard/Profile'
import { HomeInfo } from './components/dashboard/HomeInfo'
import { Home } from './components/dashboard/Home'
import { VistaPrevia } from './components/dashboard/VistaPrevia'
import './styles/Map.css'

function App() {
  const routes = useRoutes([
    {
      path: '/',
      element: <SignInSide />
    },
    {
      path: '/sign-up',
      element: <SignUp />
    },
    {
      path: '/sign-in/:frs/:snd/',
      element: <SignIn />
    },
    {
      path: '/init-info',
      element: <InitInfo />
    },
    {
      path: '/sign-up-messg',
      element: <SignUpMessage />
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
      children: [
        {
          path: 'inicio',
          element: <Home />
        },
        {
          path: 'emparejamiento',
          element: <Match />
        },
        {
          path: 'perfil',
          element: <Profile />
        },
        {
          path: 'vista-previa',
          element: <VistaPrevia />
        },
        {
          path: 'vivienda',
          element: <HomeInfo />
        },
        {
          path: 'bandeja',
          element: <Inbox />
        },
      ]
    },
    {
      path: '*',
      element: <ErrorNotFound />
    },
  ])

  return (
    routes
  );
}

export default App;

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CreateContact } from './pages/CreateContact.tsx'
import { ShowContacts } from './pages/ShowContacts.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/',
        element: <ShowContacts />
      },
      {
        path: '/create',
        element: <CreateContact />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)

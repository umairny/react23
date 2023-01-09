import { createHashRouter, Outlet, RouterProvider } from "react-router-dom"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"

import Home from "./pages/Home/Home"
import Error from "./pages/Error/Error"

import Quiz from "./projects/Quiz/Quiz"
import Tenzies from "./projects/Tenzies/Tenzies"
import Notes from "./projects/Notes/Notes"


const Layout = () => {
  return (
    <div className="app">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/quiz",
        element: <Quiz />
      },
      {
        path: "/tenzies",
        element: <Tenzies />
      },
      {
        path: "/notes",
        element: <Notes />
      }
    ]
  }
])

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App

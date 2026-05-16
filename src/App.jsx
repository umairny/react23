import { createHashRouter, Outlet, RouterProvider, useLocation } from "react-router-dom"
import { useEffect } from "react"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"

import Home from "./pages/Home/Home"
import Error from "./pages/Error/Error"

import Quiz from "./projects/Quiz/Quiz"
import Tenzies from "./projects/Tenzies/Tenzies"
import Notes from "./projects/Notes/Notes"

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto"
    })
  }, [pathname])

  return null
}

const Layout = () => {
  return (
    <div className="app">
      <ScrollToTop />
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

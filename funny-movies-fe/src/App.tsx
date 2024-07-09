import React, { useEffect, useRef, useState } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import HomePage from "./pages/homePage"
import ShareMovie from "./pages/shareMovie/ShareMovie"
import LoginPage from "./pages/login"
import RegisterPage from "./pages/register"
import axios from "./utils/axios"
import { LoadingOutlined } from "@ant-design/icons"
import { Spin, notification } from "antd"
import PrivateRoute from "./routes/PrivateRoute"
import PublicStrictRoute from "./routes/PublicRoute"
import io from "socket.io-client"

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [email, setEmail] = useState("")
  const [isAuth, setIsAuth] = useState(false)
  const [likedMovies, setLikedMovies] = useState<string[]>([])
  const [dislikedMovies, setDislikedMovies] = useState<string[]>([])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const socketRef = useRef<any>()

  const fetchProfile = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get("/user/profile")
      setEmail(response.data.email)
      setIsAuth(true)
      setLikedMovies(() => [...response.data.likedMovies])
      setDislikedMovies(() => [...response.data.dislikedMovies])
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  useEffect(() => {
    if (isAuth) {
      const token = localStorage.getItem("token")
      socketRef.current = io(`${process.env.VITE_APP_SOCKET_URL}`, {
        auth: {
          token,
        },
        secure: true,
      })
      socketRef.current.on("userConnected", () => {
        socketRef.current.emit("join")
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      socketRef.current.on("newMovie", (data: any) => {
        openNotification(data.title)
      })
    }
  }, [isAuth])

  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.emit("leave")
        socketRef.current.disconnect()
      }
    }
  }, [])

  const [api, contextHolder] = notification.useNotification()

  const openNotification = (title: string) => {
    api.info({
      message: `New video arrived!`,
      description: `Hello, video ${title.toUpperCase()} has been shared!`,
    })
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    setEmail("")
    setIsAuth(false)
  }

  const handleLogin = async (email: string, password: string) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axios.post("/user/login", { email, password })
      localStorage.setItem("token", response.data.token)
      fetchProfile()
    } catch (error) {
      throw error
    }
  }

  if (isLoading) {
    return <Spin indicator={<LoadingOutlined spin />} size="large" />
  }
  return (
    <>
      {contextHolder}
      <Router>
        <div className="App flex flex-col">
          <Header isAuth={isAuth} email={email} onLogout={handleLogout} />
          <div className="flex-1">
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    isAuth={isAuth}
                    likedMovies={likedMovies}
                    dislikedMovies={dislikedMovies}
                  />
                }
              />
              <Route element={<PublicStrictRoute isAuth={isAuth} />}>
                <Route path="/register" element={<RegisterPage />} />
                <Route
                  path="/login"
                  element={<LoginPage onLogin={handleLogin} />}
                />
              </Route>
              <Route element={<PrivateRoute isAuth={isAuth} />}>
                <Route
                  path="/share"
                  element={<ShareMovie socket={socketRef} />}
                />
              </Route>
            </Routes>
          </div>
        </div>
      </Router>
    </>
  )
}

export default App

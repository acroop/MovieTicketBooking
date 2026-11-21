import { Route, Routes } from "react-router-dom"
import Header from "./components/shared/Header"
import Footer from "./components/shared/Footer"
import Home from "./pages/Home"
import Movies from "./pages/Movies"
import MovieDetails from "./pages/MovieDetails"

function App() {

  return (
    <>
      <div className="flex flex-col  min-h-screen ">
        <main className="flex-grow">
          <Header />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/profile/:id" element={<h1>Profile</h1>} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:movieId" element={<MovieDetails />} />
          </Routes>
          <Footer />
        </main>
      </div>
    </>
  )
}

export default App

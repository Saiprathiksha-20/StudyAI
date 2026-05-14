import {
  Routes,
  Route,
  useLocation
} from "react-router-dom";

import Navbar
from "./components/Navbar";

import Home
from "./pages/Home";

import Login
from "./pages/Login";

import Signup
from "./pages/Signup";

import Dashboard
from "./pages/Dashboard";

import Upload
from "./pages/Upload";

import Quiz
from "./pages/Quiz";

import Flashcards
from "./pages/Flashcards";

import Summarizer
from "./pages/Summarizer";

import ProtectedRoute
from "./utils/ProtectedRoute";


function Layout() {

  const location =
    useLocation();

  return (

    <>

      <Navbar />

      <Routes>

        {/* PUBLIC */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />


        {/* PROTECTED */}

        <Route
          path="/dashboard"

          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/upload"

          element={
            <ProtectedRoute>
              <Upload />
            </ProtectedRoute>
          }
        />

        <Route
          path="/quiz"

          element={
            <ProtectedRoute>
              <Quiz />
            </ProtectedRoute>
          }
        />

        <Route
          path="/flashcards"

          element={
            <ProtectedRoute>
              <Flashcards />
            </ProtectedRoute>
          }
        />

        <Route
          path="/summarizer"

          element={
            <ProtectedRoute>
              <Summarizer />
            </ProtectedRoute>
          }
        />

      </Routes>

    </>
  );
}


function App() {

  return <Layout />;
}

export default App;
import { Routes } from "react-router-dom";
import "./App.css";
import { Route } from "react-router-dom";
import HomePage from "./Pages/HomePage"
import Footer from "./Components/Footer";
import HomeLayout from "./Layouts/HomeLayout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
  </Routes>
 
    </>
  );
}

export default App;

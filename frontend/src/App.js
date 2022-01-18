import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyRequests from "./screens/MyRequests/MyRequests";
import LoginPage from "./screens/LoginPage/LoginPage";
import RegisterPage from "./screens/RegisterPage/RegisterPage";

const App = () => (
  <BrowserRouter>
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<LandingPage/>}  exact />
        <Route path="/login" element={<LoginPage/>}  exact />
        <Route path="/register" element={<RegisterPage/>}  exact />
        <Route path="/myrequests" element={<MyRequests />} />
      </Routes>
    </main>

    <Footer />
  </BrowserRouter>
);

export default App;

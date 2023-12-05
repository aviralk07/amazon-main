import "./App.css";
import Checkout from "./Components/Checkout";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Login from "./Components/Login";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const renderHeader = !isLoginPage && <Header />;

  return (
    <div className="App">
      {renderHeader}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;

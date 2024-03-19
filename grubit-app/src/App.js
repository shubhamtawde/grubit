import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/Registration_Process/signIn";
import SignUp from "./pages/Registration_Process/signUp.js";
import ForgetPass from "./pages/Registration_Process/forgetPass";
import Home from "./pages/Main_Process/Home";
import ManageAccount from "./pages/Profile/ManageAccount";
import Menu from "./pages/Main_Process/Menu";
import Booking from "./pages/Main_Process/Booking";
import Checkout from "./pages/Main_Process/Checkout";
import OrderHistory from "./pages/Profile/OrderHistory";
import Cart from "./pages/Main_Process/Cart";
import Admin from "./pages/Admin/Admin";
import Admin1 from "./pages/Admin/Admin1";
import Success from "./pages/Main_Process/Success";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />}></Route>
          <Route path="/signUp" element={<SignUp />}></Route>
          <Route path="/forgetPassword" element={<ForgetPass />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/manageAccount" element={<ManageAccount />}></Route>
          <Route path="/menu" element={<Menu />}></Route>
          <Route path="/booking" element={<Booking />}></Route>
          <Route path="/checkout" element={<Checkout/>}></Route>
          <Route path="/orderHistory" element={<OrderHistory/>}></Route>
          <Route path="/cart" element={<Cart/>}></Route>
          <Route path="/admin" element={<Admin/>}></Route>
          <Route path="/admin1" element={<Admin1/>}></Route>
          <Route path="/success" element={<Success/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

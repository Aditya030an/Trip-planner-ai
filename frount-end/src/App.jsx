import "./App.css";
import Header from "./components/custom/Header";
import Index from "./create-trip/index";
import Hero from "./components/custom/Hero";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/custom/Login";
import Logout from "./components/custom/Logout";
import SignIn from "./components/custom/SignIn";
import PrivateComponent from "./components/custom/PrivateComponent";
import { Toaster } from "./components/ui/sonner";
import ViewTrip from "./view-trip/ViewTrip";
import MyTrip from "./my-trip/MyTrip";
import ErrorMsg from "./components/custom/ErrorMsg";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Header />
          <Toaster />
          <Routes>
            <Route element={<PrivateComponent />}>
              <Route path="/logout" element={<Logout />} />
              <Route path="/my-trip" element={<MyTrip />} />
              <Route path="/create-trip" element={<Index />} />
              <Route path="/view-trip/:id" element={<ViewTrip />} />
            </Route>
            <Route path="/" element={<Hero />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="*" element={<ErrorMsg/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

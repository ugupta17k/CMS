
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Auth } from "./pages/Auth";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { CreatePost } from "./pages/CreatePost";


export function App() {
  
  return (
    <div className="">
      <BrowserRouter>
      <Routes>
          <Route path="/" element= {<Home />}/>
          <Route path="/Auth" element= {<Auth />}/>
          <Route path="/Profile" element= {<Profile />}/>
          <Route path="/CreatePost" element= {<CreatePost />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

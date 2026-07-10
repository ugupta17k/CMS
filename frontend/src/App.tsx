
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Auth } from "./pages/Auth";

export function App() {
  return (
    <div className="">
      <BrowserRouter>
      <Routes>
          <Route path="/Auth" element= {<Auth />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

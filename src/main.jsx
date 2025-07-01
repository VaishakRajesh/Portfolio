import { createRoot } from "react-dom/client";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import Router from "./Router";
createRoot(document.getElementById('root')).render(

 <BrowserRouter>
 <Router/>
 </BrowserRouter>

)

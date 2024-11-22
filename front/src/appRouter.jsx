import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./Pages/Home.jsx";


const AppRouter =() =>{
    return(
    <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
    </Routes>
    )
}


export default AppRouter;
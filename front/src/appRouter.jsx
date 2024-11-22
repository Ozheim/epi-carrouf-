import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./Pages/Home.jsx";
import Login from './Pages/Login.jsx';
import SignUp from './Pages/SignUp.jsx';
import PrivateRoutes from './Utils/PrivateRoutes.jsx';
import Store from "../src/Pages/Store.jsx";
import Cart from "./Pages/Cart.jsx";


const AppRouter =() =>{
    return(
    <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Login" element={<Login/>}/>
            <Route path="/SignUp" element={<SignUp/>}/>
            <Route path="/Store" element={<Store />}/>  
            <Route path="/Panier" element={<Cart/>} />
                   
                {/* <Route
                path="/Store"
                element={
                    <PrivateRoutes roleRequired="user">
                        <Store />
                    </PrivateRoutes>
                }
            /> */}
        
    </Routes>
    )
}


export default AppRouter;
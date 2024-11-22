import { Children } from "react";
import { Navigate } from "react-router";

const PrivateRoutes= ({childrens, roleRequired}) =>{
     const token = localStorage.getItem("token");
     const role = localStorage.getItem("role")

     if(!token){
        console.error("bro ta pas de token aussi ")
        return <Navigate to ="/Login"/>
     
     }
    else if(role!== roleRequired){
        console.error("ta aucun role, tu es un sans role ")
        return <Navigate to= "/Login" />
    }
    else{
        return childrens;
    }
}


export default PrivateRoutes;
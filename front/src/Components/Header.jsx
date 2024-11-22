import "../Styles/Components/Header.scss";
import Logo from "../Assets/logo.png";


const Header = () =>{
    return(
        <div>
            <div className="header-container">
                <ul className="header-list">
                    <li><img src={Logo} alt="logo"  className="logo"/></li>
                    <li className="Connexion-button"><a href="/Login">Connexion</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Header; 
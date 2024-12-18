
import Logo from "../Assets/logo.png";


const Header = () =>{
    return(
        <div>
            <div className="header-container">
                <ul className="header-list">
                    <li><img src={Logo} alt="logo"  className="logo"/></li>
                    <div className="link-Container">
                    <li className="Connexion-button"><a href="/Login">Connexion</a></li>
                    <li><a href="/Panier">Votre Panier</a></li>
                    </div>
                </ul>
            </div>
        </div>
    )
}

export default Header; 
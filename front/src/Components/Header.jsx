import "../Styles/Components/Header.scss";
import Logo from "../";


const Header = () =>{
    return(
        <div>
            <div className="header-container">
                <ul className="header-list">
                    <li><img src={Logo} alt="" /></li>
                    <li className="Connexion-button"><a href="">Connexion</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Header; 
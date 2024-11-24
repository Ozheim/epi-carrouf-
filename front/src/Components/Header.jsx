import Logo from "../Assets/logo.png";

const Header = () => {
    return (
        <header className="header-container">
            <ul className="header-list">
                <li>
                    <img src={Logo} alt="logo" className="logo" />
                </li>
                <li className="connexion-button">
                    <a href="/Login">Connexion</a>
                </li>
            </ul>
        </header>
    );
};

export default Header;

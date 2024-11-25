import Header from "../Components/Header.jsx";


const Home = () => {
    return (
        <div className="home">
            <div className="header-container">
                <Header />
            </div>
            <div className="main-content">
                <h1>Bienvenue sur notre site</h1>
                <p>
                    Découvrez une variété d'articles uniques à des prix abordables. Explorez notre boutique pour trouver exactement ce que vous cherchez et bien plus encore !
                </p>
                <div className="buttons-container">
                    <a href="/Store" className="btn">Explorer la boutique</a>
                    <a href="/SignUp" className="btn secondary">Créer un compte</a>
                </div>
            </div>
            <div className="footer-container">
            </div>
        </div>
    );
};

export default Home;


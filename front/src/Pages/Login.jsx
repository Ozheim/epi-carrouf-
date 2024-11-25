
import { useState } from "react";
import { useNavigate } from "react-router";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const FetchUser = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/users", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) {
                console.error("c'est non");
            }
            const data = await response.json();
            console.info("user connecred", data);
            navigate("/discoNunu");
        } catch (error) {
            console.error("bon c chiant: ", error);
        }
    };

    return (
        <div className="login-container">
            <div className="Wrapper-Login">
                <h1>Connexion</h1>
                <form onSubmit={FetchUser}>
                    <label>Email :</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label>Password :</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Se connecter</button>
                </form>
                <p>
                    Pas de compte ? Inscrivez-vous ça coûte 10 millions <a href="/SignUp">ici</a>
                </p>
            </div>
        </div>
    );
};

export default Login;

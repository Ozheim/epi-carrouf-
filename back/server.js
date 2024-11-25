const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken'); // Importer JSON Web Token
require('dotenv').config();

// Créer une instance de l'application Express
const app = express();

// Configurer le port de l'application
const PORT = process.env.PORT || 5000;

// Configurer la connexion à la base de données MariaDB
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

// Vérifier la connexion à la base de données
db.connect(err => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err);
        process.exit(1);
    }
    console.log('Connecté à la base de données MariaDB');
});

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Clé secrète pour JWT (doit être définie dans le .env)
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// Middleware pour vérifier les tokens JWT
function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token manquant' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token invalide' });
        req.user = user; // Stocker les informations utilisateur dans req.user
        next();
    });
}

// Route pour créer un utilisateur
app.post('/users', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email et mot de passe sont requis' });
    }

    // Insertion de l'utilisateur dans la base de données
    const query = 'INSERT INTO user (email, password_hash) VALUES (?, ?)';
    db.query(query, [email, password], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'ajout de l\'utilisateur :', err);
            return res.status(500).json({ error: 'Erreur du serveur' });
        }
        res.status(201).json({ message: 'Utilisateur créé', userId: result.insertId });
    });
});

// Route pour se connecter
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email et mot de passe sont requis' });
    }

    // Vérifier si l'utilisateur existe
    db.query('SELECT * FROM user WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Erreur lors de la vérification de l\'utilisateur :', err);
            return res.status(500).json({ error: 'Erreur du serveur' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Utilisateur non trouvé ou mot de passe incorrect' });
        }

        const user = results[0];

        // Comparer le mot de passe directement
        if (password !== user.password_hash) {
            return res.status(401).json({ error: 'Utilisateur non trouvé ou mot de passe incorrect' });
        }

        // Créer un token JWT
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Connexion réussie', token });
    });
});

// Route protégée pour récupérer tous les articles (nécessite un token valide)
app.get('/articles', (req, res) => {
    db.query('SELECT * FROM articles', (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des articles :', err);
            return res.status(500).json({ error: 'Erreur du serveur' });
        }
        res.json(results);
    });
});

// Route pour enregistrer un utilisateur
app.post('/register', (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe sont requis' });
    }
  
    // Insertion de l'utilisateur dans la base de données
    const query = 'INSERT INTO user (email, password_hash) VALUES (?, ?)';
    db.query(query, [email, password], (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'enregistrement de l\'utilisateur :', err);
        return res.status(500).json({ error: 'Erreur du serveur' });
      }
      res.status(201).json({ message: 'Utilisateur enregistré avec succès', userId: result.insertId });
    });
  });
  

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur Express en écoute sur le port ${PORT}`);
});

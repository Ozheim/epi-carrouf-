const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
require("dotenv").config()

// Créer une instance de l'application Express
const app = express();

// Configurer le port de l'application
const PORT = process.env.PORT || 3000;

// Configurer la connexion à la base de données MariaDB
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER, // Remplace par ton utilisateur MariaDB
    password: process.env.DB_PASS, // Remplace par ton mot de passe
    database: process.env.DB_NAME, // Le nom de ta base de données
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

// Route pour récupérer tous les utilisateurs
app.get('/users', (req, res) => {
  db.query('SELECT * FROM user', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des utilisateurs :', err);
      return res.status(500).json({ error: 'Erreur du serveur' });
    }
    res.json(results);
  });
});

// Route pour créer un utilisateur
app.post('/users', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe sont requis' });
  }

  // Hash du mot de passe avec bcrypt
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Erreur lors du hashage du mot de passe :', err);
      return res.status(500).json({ error: 'Erreur du serveur' });
    }

    // Insertion de l'utilisateur dans la base de données
    const query = 'INSERT INTO user (email, password_hash) VALUES (?, ?)';
    db.query(query, [email, hashedPassword], (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'ajout de l\'utilisateur :', err);
        return res.status(500).json({ error: 'Erreur du serveur' });
      }
      res.status(201).json({ message: 'Utilisateur créé', userId: result.insertId });
    });
  });
});

// Route pour récupérer tous les articles
app.get('/articles', (req, res) => {
  db.query('SELECT * FROM articles', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des articles :', err);
      return res.status(500).json({ error: 'Erreur du serveur' });
    }
    res.json(results);
  });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur Express en écoute sur le port ${PORT}`);
});

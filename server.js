const express = require("express");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const helmet = require("helmet");
const sqlite3 = require("sqlite3");
const bcrypt = require("bcrypt");
const lessc = require("less");

const app = express();

// Connexion à la bdd
let db = new sqlite3.Database("db/database.db", (err) => {
    if (err) throw err;
});
// Création des tables
{
    db.run(`
        CREATE TABLE IF NOT EXISTS users(
            name TEXT PRIMARY KEY,
            password TEXT,
            avatar TEXT,
            status TEXT,
            registred TEXT,
            last_login TEXT,
            score INTEGER DEFAULT 0,
            level INTEGER DEFAULT 0
        );
    `, (err) => {
        if (err) throw err;
    });
    db.run(`
        CREATE TABLE IF NOT EXISTS rivals(
            asker INTEGER PRIMARY KEY,
            receiver INTEGER,
            status TEXT DEFAULT "waiting"
        );
    `, (err) => {
        if (err) throw err;
    });    
}


// Middlewares
app.set("views", "public/views/");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index", {});
});

app.listen(3000, () => {
    console.log("Le serveur est en écoute.");
    console.log("Aller à http://localhost:3000/");
});
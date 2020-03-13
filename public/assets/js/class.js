const sqlite3 = require("sqlite3");

// Connexion à la bdd
let db = new sqlite3.Database("./././db/database.db", (err) => {
    if (err) throw err;
});
class User {
    constructor(row) {
        this.fetch(row);
    }
    fetch(row) {
        if (this.rowid !== undefined) {
            db.get(`SELECT rowid,* FROM users WHERE rowid = ?`, [this.rowid], (err, data) => {
                if (err) throw err;
                if (data) {
                    this.fetch(data);
                }
            });
        } else if (typeof row === "object") {
            for (const column in row) {
                if (row.hasOwnProperty(column)) {
                    // Fusion des données
                    this[column] = row[column];
                }
            }
        } else if (typeof row === "number") {
            db.get(`SELECT rowid,* FROM users WHERE rowid = ?`, [row], (err, data) => {
                if (err) throw err;
                if (data) {
                    this.fetch(data);
                }
            });
        }
    }
    delete() {
        db.run(`
            UPDATE users
                SET password = NULL,
                    avatar = NULL,
                    status = "deleted",
                    registered = NULL,
                    last_login = NULL,
                    score = NULL,
                    level = NULL
                WHERE rowid = ?
            `,
            [this.id],
            (err) => {
                if (err) throw err;
                this.fetch();
            }
        );
    }
    edit(form) {
        this.fetch(form);
    }
}
// Affichage de la table "users"
db.each("SELECT rowid,* FROM users WHERE 1", (err, data) => {
    if (err) throw err;
    console.log(data);
});
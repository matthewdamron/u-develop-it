const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

// Connect to database
const db = new sqlite3.Database('./db/election.db', err => {
    if (err) {
        return console.log(err.message);
    }

    console.log('Connected to the election database.');
});

// // GET all candidates from election db
// db.all(`SELECT * FROM candidates`, (err, rows) => {
//     if (err) {
//         console.log(err.message);
//     }
//     // console.log(rows);
// });

// // GET a single candidate from election db
// db.get(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
//     if (err) {
//         console.log(err.message);
//     }
//     // console.log(row);
// })

// Delete a candidate from election db
// db.run(`DELETE FROM candidates WHERE id = ?`, 1, function (err, result) {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result, this, this.changes);
// });

// Create a candidate
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) 
//               VALUES (?,?,?,?)`;
// const params = [1, 'Ronald', 'Firbank', 1];
// // ES5 function, not arrow function, to use this
// db.run(sql, params, function (err, result) {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result, this.lastID);
// });

app.use((req, res) => {
    res.status(404).end();
});

// Start server after DB connection
db.on('open', () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
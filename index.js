const express = require('express')
const app = express()
// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

const port = 3000
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db/chinook.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the chinook database.');
});


app.get('/', (req, res) => {
    let sql = `SELECT ArtistId as id,
                Name as name
                FROM artists`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        console.log("rows print:")
        console.log(rows)
        res.render('home', {artists:rows})
        //res.send({artists:JSON.stringify(rows)})
    });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
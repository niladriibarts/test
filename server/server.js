require('dotenv').config();
const mysql = require('mysql2');
const PORT = process.env.PORT || 8000
const express = require('express');
const app = express();
const cors = require("cors");

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false
    }
});
db.connect((err) => {
    if (err) {
        console.log('Db not connected');
    } else {
        console.log('Db connected');
    }
});

app.use(cors());
app.use(express.json());

let loginData = [];

app.get('/', (req, res) => {
    return res.json({
        data: loginData
    });
});

app.post('/', (req, res) => {
    const data = req.body;
    loginData.push(data);

    const {email,password} = req.body;
    db.query(
        `SELECT * FROM users WHERE email=?`,
        [email],
        (err, result) => {

            if (err) {
                return res.json({ error: 'DB error ❌' });
            }

            if (result.length === 0) {
                return res.json({ error: 'User not found ❌' });
            }

            const user = result[0];

            if (password !== user.password) {
                return res.json({ error: 'Wrong password ❌' });
            }

            return res.json({ message: 'Login Successfully ✅' });
        }
    );

});

app.get('/register', (req, res) => {
    db.query(
        `SELECT * FROM users`,
        (err, result) => {
            if (err){
                return res.json({
                    error: err
                })
            }
            return res.json({
                data: result
            });
        });
});


app.post('/register', (req, res) => {

    const { email, password, name } = req.body;
    db.query(
        `SELECT * FROM users WHERE email=?`,
        [email],
        (err, result) => {
            if (result.length > 0) {
                return res.json({
                    error: "Change the email"
                })
            }
            db.query(
                `INSERT INTO users (email, password, name) VALUES(?,?,?)`,
                [email, password, name],
                (err, result) => {
                    if (err) {
                        return res.json(
                            {
                                error: "Data not added in DB"
                            }
                        )
                    } else {
                        return res.json(
                            {
                                message: "Data added in DB"
                            }
                        )
                    }

                }
            );
        }
    );
});

// app.post('/register',(req,res)=>{
//     const data = req.body;
//     const {email,password,name} = req.body;
//     registerData.push(data);
//     db.query(
//         'SELECT * FROM users WHERE email = ?',
//         [email],
//         (err, result)=>{
//             if(result.length > 0){
//                 res.json({
//                     error:'Change the email'
//                 });
//             }

//             db.query(
//                 `INSERT INTO users (email,password,name) VALUES (?,?,?)`,
//                 [email,password,name],
//                 (err,result)=>{
//                     if(err){
//                         res.json({
//                             error:'Data not added'
//                         })
//                     }
//                 }
//             );
//         }
//     );
//     res.json({
//         message: "We are getting Data"
//     })
// });


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000;
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
db.connect((err)=>{
    if(err){
        console.error('Db not connect:',err);
    }else{
        console.log('Db connected');
    }
});

app.use(cors());
app.use(express.json());

app.post('/', async(req, res)=>{
    const {email,password} = req.body;
    if(!email ||!password){
        return res.json({
            error:'Enter all details'
        })
    }
    try{

        const [loginUsers] = await db.promise().query(
            `SELECT * FROM users WHERE email=?`,
            [email]
        );

        if(loginUsers.length === 0){
            return res.json({
                error: 'User not register'
            });
        }

        const user = loginUsers[0];
        const isMatch = await bcrypt.compare(password,user.password);
        
        if(!isMatch){
            return res.json({
                error:'Invavlid password'
            });
        }
        
        const token = jwt.sign(
            {
                id:user.id,
                email:user.email
            },
            process.env.JWT_SECRET,
            {expiresIn:'1d'}
        );

        return res.json({
            message:'Login successfully',
            token
        });

    }catch(err){
        return res.json({
            error:'Server error'
        })
    }
});

app.get('/users', async(req,res)=>{
    try{

        const [users] = await db.promise().query(
            'SELECT * FROM users'
        );
        return res.json({
            data:users
        });

    }catch(err){
        return res.json({
            error:'server error'
        });
    }
});

app.post('/register', async(req, res)=>{
    const {name, email, password} = req.body;
    if(!name||!email||!password){
        return res.json({
            error: "All fields are required"
        });
    }
    try{
        const [existingUser] = await db.promise().query(
            `SELECT * FROM users WHERE email=?`,
            [email]
        );
        
        if(existingUser.length > 0){
            return res.json({
                error:'Already registered'
            });
        }

        const hashPassword = await bcrypt.hash(password,10);
        await db.promise().query(
            `INSERT INTO users (email, password, name) VALUES (?,?,?)`,
            [email, hashPassword, name]
        );
        return res.json({
            message:'User registered successfully'
        });

    }catch(err){
        return res.json({
            error:'Server error'
        });
    }
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`);
});












// require('dotenv').config();
// const mysql = require('mysql2');
// const PORT = process.env.PORT || 8000
// const bcrypt = require('bcrypt');
// const express = require('express');
// const app = express();
// const cors = require("cors");

// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//     ssl: {
//         rejectUnauthorized: false
//     }
// });

// db.connect((err) => {
//     if (err) {
//         console.log('Db not connected');
//     } else {
//         console.log('Db connected');
//     }
// });

// app.use(cors());
// app.use(express.json());

// app.post('/', async(req, res) => {

//     const {email,password} = req.body;
//     if (!email || !password ) {
//         return res.status(400).json(
//             { error: "All fields are required" }
//         );
//     }

//     try{
//         const [rows] = await db.promise().query(
//             'SELECT * FROM users WHERE email=?',
//             [email]
//         );

//         if (rows.length === 0) {
//             return res.json(
//                 { error: 'User not found ❌' }
//             );
//         }

//         const user = rows[0];

//         const isMatch = await bcrypt.compare(password, user.password);

//         if (!isMatch) {
//             return res.json(
//                 { error: 'Wrong password ❌' }
//             );
//         }

//         return res.json(
//             { message: 'Login Successfully ✅' }
//         );

//     }catch(error){
//         return res.status(500).json({
//             error: "Server error for Login Post"
//         });
//     }

// });

// app.get('/users', async(req, res) => {
//     try{
//         const [rows] = await db.promise().query(
//             `SELECT * FROM users`
//         );
//         return res.json(
//             {
//                 data:rows
//             }
//         );
//     }catch(err){
//         return res.status(500).json({
//             error: "Server error for Users"
//         });
//     }

// });


// app.post('/register', async(req, res)=>{
//     const {email, password, name}= req.body;
//     if (!email || !password || !name) {
//         return res.status(400).json(
//             { error: "All fields are required" }
//         );
//     }

//     if (password.length < 6) {
//         return res.status(400).json(
//             { error: "Password must be at least 6 characters" }
//         );
//     }
//     try{
//         const [rows] = await db.promise().query(
//             `SELECT * FROM users WHERE email=?`,
//             [email]
//         );
//         if(rows.length > 0){
//             return res.json({
//                 error:'User alrady exists'
//             })
//         }
//         const hashPassword = await bcrypt.hash(password, 10);
//         await db.promise().query(
//             `INSERT INTO users (email, password, name) VALUES (?,?,?)`,
//             [email, hashPassword, name]
//         );
//         return res.json(
//             {
//                 message:'User Registered'
//             }
//         );

//     }catch(error){
//         return res.json(
//             {
//                 error: 'Server error'
//             }
//         )
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on ${PORT}`);
// });


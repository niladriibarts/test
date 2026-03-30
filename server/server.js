require('dotenv').config();

const PORT = process.env.PORT || 8000
const express = require('express');
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

let loginData = [];
app.get('/', (req, res)=>{
    res.json({
        data: loginData
    });
});

app.post('/',(req,res)=>{
    const data = req.body;
    loginData.push(data);
    res.json({
        message: "We are getting Data"
    })
});

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
});
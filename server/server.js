require('dotenv').config();
const PORT = process.env.PORT || 8000
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res)=>{
    res.json({
        data: 'Test'
    });
});

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
});
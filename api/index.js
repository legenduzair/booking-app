const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User')
require('dotenv').config()
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);

app.use(express.json())

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res) => {
    res.json('User Registered');
});

app.post('/register', async (req, res) => {
    const {name, email, password} = req.body;
    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt)
        });
    
        res.json(userDoc);
    } catch(e) {
        res.status(422).json(e);
    }
});

app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const userDoc = await User.findOne({email});
    if (userDoc) {
        const passSuccess = bcrypt.compareSync(password, userDoc.password);
        if (passSuccess) {
            res.json('Password is Correct');
        } else {
            res.status(422).json('Password Incorrect');
        }
    } else {
        res.json('User Not Found');
    }
});

app.listen(4000)
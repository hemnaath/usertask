const express = require('express');
require('./config/db');
const cors = require('cors');
const userRouting = require('./route/user-route');
const orgRouting = require('./route/org-route');
const passport = require('./middleware/auth-middleware');

const app = express();
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

app.use('/user', userRouting);
app.use('/org', orgRouting);

app.listen(1731, ()=>{
    console.log('Server Connected');
});
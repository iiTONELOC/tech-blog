const express = require('express');
const routes = require('./controllers/');
const sequelize = require('./config/connection');
const path = require('path');
const exphbs = require('express-handlebars');
<<<<<<< HEAD
=======
const hbs = exphbs.create({});
const https = require('https');
const fs = require('fs')
>>>>>>> e42ccc7b3765825ba53e8fac4d782482cf185c02
//IMPORT SESSIONS
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {maxAge:300000},
    resave: false,
    saveUninitialized: true,
    rolling: true,
    store: new SequelizeStore({
        db: sequelize
    })
};
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });
const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));

// turn on routes
app.use(routes);


// const key = fs.readFileSync('./key.pem', 'utf8');
// const cert = fs.readFileSync('./server.crt', 'utf8');

// process.env.TEST ? sequelize.sync({ force: false }).then(() => {
//     app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
// }) : sequelize.sync({ force: false }).then(() => {
//     const server = https.createServer({ key: key, cert: cert }, app);
//     server.listen(PORT, () => console.log(`Now listening on ${PORT}`))
// })

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
})




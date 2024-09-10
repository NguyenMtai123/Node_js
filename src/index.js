const express = require('express');
const path = require('path');
const morgan = require('morgan');
const methodOvereide = require('method-override');
const hbs = require('express-handlebars');

const db = require('./config/db');
const app = express();
const port = 3000;
const route = require('./routes');

db.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());
app.use(methodOvereide('_method'));
app.use(morgan('combined'));
app.engine(
    '.hbs',
    hbs.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Route init
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

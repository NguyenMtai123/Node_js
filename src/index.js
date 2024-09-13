const express = require('express');
const path = require('path');
const morgan = require('morgan');
const methodOvereide = require('method-override');
const hbs = require('express-handlebars');

const db = require('./config/db');
const app = express();
const port = 3000;
const route = require('./routes');

const SortMiddleware = require('./app/middlewares/sortMiddleware.x');

db.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(SortMiddleware);
app.use(express.json());
app.use(methodOvereide('_method'));
// app.use(morgan('combined'));
app.engine(
    '.hbs',
    hbs.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default';
                const icons = {
                    default: 'fas fa-sort',
                    asc: 'fas fa-sort-amount-down-alt',
                    desc: 'fas fa-sort-amount-down',
                };

                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                };

                const icon = icons[sortType];
                const type = types[sortType];
                return `<a href="?_sort&column=${field}&type=${type}"><i class="${icon}"></i></a>`;
            },
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

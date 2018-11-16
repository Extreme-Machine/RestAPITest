const express = require('express');
const logger = require('./logger');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(logger);

const courses = [
    {id: 1, name:'course1'},
    {id: 2, name:'course2'},
    {id: 3, name:'course3'},
];

app.get('/', (req, res) =>{
    res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('Not found.');
    res.send(course);
});

app.post('/api/courses', (req,res) => {
    const course = {
        id : courses.length +1,
        name : req.body.name,
    }
    courses.push(course);
    res.send(course);
});

app.listen(3000, () => console.log('Listening on port 3000...'));

//Environment Variable
//const port = process.env.PORT || 3000;
//app.listen(port, () => console.log(`Listening on port ${port}...`));
//Testing ssh
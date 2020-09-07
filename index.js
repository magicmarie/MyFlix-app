const express = require('express');
  morgan = require('morgan');
  bodyParser = require('body-parser'),
  methodOverride = require('method-override');
  uuid = require('uuid');

const app = express();

app.use(morgan('common'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());


// error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

let movies = [
  {
    title: 'Bohemian Rhapsody',
    year: 2018,
    description: 'Description about Bohemian Rhapsody',
    genre: {
      name: 'drama',
      description: 'Description of biographical drama'
    },
    director: {
      name: 'Bryan Singer',
      bio: 'Bio of Bryan Singer',
      birth: '1965',
      death: ''
    },
    imageURL: '',
    featured: ''
  },
  {
    title: 'Forrest Gump',
    year: 1994,
    description: 'Description about Forrest Gump',
    genre: {
      name: 'drama',
      description: 'Description of comedy drama'
    },
    director: {
      name: 'Robert Zemeckis',
      bio: 'Bio of Robert Zemeckis',
      birth: '1952',
      death: ''
    },
    imageURL: '',
    featured: ''
  }
];

let users = [
  {
    id: 1,
    username: 'CareerFoundry',
    password: '',
    email: 'cf.com',
    birthday: ''
  }
];

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to movie api!');
});

app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', (req, res) => {
  res.json(movies);
});

app.get('/movies/:title', (req, res) => {
  res.json({ title: 'drama'});
});

app.get('/movies/genre/:title', (req, res) => {
  res.json({ genre: 'drama'});
});

app.get('/movies/director/:name', (req, res) => {
  res.json({
    name: 'Bryan Singer',
    birth: '1965',
    death_year: 'nil'
  });
});

app.get('/users', (req, res) => {
  res.json(users);
});


// post requests
app.post('/users', (req, res) => {
  var newUser = req.body;

  if (!newUser.username) {
    var message = 'Missing username in request body';
    res.status(400).send(message);
  } else {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).send(newUser);
  }
});

app.post('/users/:id/favourites', (req, res) => {
  res.json({
    message: "Movies successfully added to favourite"
  })
})

// put requests
app.put('/users/:id', (req, res) => {
  res.json({message: 'User details Updated successfully'})
})

// delete requests
app.delete('/users/:id/favourites/:favourite_id', (req, res) => {
  res.json({
    message: "Favourite movie deleted successfully"
  })
})

app.delete('/users/:id', (req, res) => {
  res.json({
    message: "User deleted successfully"
  })
})

// listen for requests
app.listen(8080, () =>
  console.log('Your app is listening on port 8080.'));

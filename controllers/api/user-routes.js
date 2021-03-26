const router = require('express').Router();
const { User, Meeting } = require('../../models');


////////////////////////////////////////
//  THESE ARE THE USER ROUTES
// get '/' :    (get/api/users)      REQUEST ALL users 
// get '/:id    (get/api/users/:id   REQUEST existing user by id
// post '/'     (post/api/users)     CREATE a new user
// post '/login'(api/users/login)    REQUEST user by email
// post '/logout' (api/users/logout) LOGOUT current user
// put '/:id'   (put/api/users/:id)  UPDATES user that matches id
// delete '/:id'(delete/api/users/:id) DELETE user by id


/////////////////////////////////////////////////////////

// GET ALL USERS
// route: get/api/users
router.get('/', (req, res) => {
  User.findAll({
    attributes:['id','firstname','lastname','available'],
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET USER BY ID
// (Use meeting routes to get meetings by user ID)
router.get('/:id', (req, res) => {
  User.findOne({
    where: {
      id: req.params.id
    },
    attributes: { exclude: ['password'] },
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: `No user found with id: ${req.params.id}`});
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// 
// ADD NEW USER
// called from public/javascript/signup.js
// 
router.post('/', (req, res) => {
  User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    available: req.body.available
  })
    .then(dbUserData => {
        req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.firstname = dbUserData.firstname;
        req.session.lastname = dbUserData.lastname;
        req.session.loggedIn = true;
        res.json(dbUserData);
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// post route /api/users/login
// login existing user
// called from login.js
router.post('/login', (req, res) => {
  // expects {email: 'abnormal@gmail.com', password: 'pwdd'}
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json({ message: `No user found with email: ${req.body.email}` });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.firstname = dbUserData.firstname;
      req.session.lastname = dbUserData.lastname;
      req.session.loggedIn = true;
  
      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
  });
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    res.status(404).end();
  }
});

router.put('/:id', (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}

  // pass in req.body instead to only update what's passed through
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: `No user found with id: ${req.params.id}` });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: `No user found with id: ${req.params.id}` });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

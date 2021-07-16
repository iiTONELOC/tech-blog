const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const Location = require('../../utils/Location')

// get all users
router.get('/', (req, res) => {
    User.findAll(
        { attributes: { exclude: ['password'] } }
    )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'post_data', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            },

        ]
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', async (req, res) => {
    const { latitude, longitude, username, email, password } = { ...req.body }
    const latData = async () => {
        if (latitude == undefined) {
            const { lat } = await Location.user(req);
            return lat
        } else {
            return latitude
        }
    };
    const lonData = async () => {
        if (longitude == undefined) {
            const { lon } = await Location.user(req);
            return lon
        } else {
            return longitude
        }
    };

    const lat = await latData();
    const lon = await lonData();
    User.create({
        username: username,
        email: email,
        password: password,
        latitude: lat,
        longitude: lon,
    })
        .then(dbUserData => {

            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json(dbUserData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/login', (req, res) => {
    // expects {email: 'lernantino@gmail.com', password: 'password1234'}
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user with that email address!' });
            return;
        }

        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
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



router.put('/updateLocation', async (req, res) => {
    if (req.session.user_id == undefined) {
        return
    }
    console.log('USER +++++++++++++++++++++++++', req.session.user_id)
    const { latitude, longitude, } = { ...req.body }
    const latData = async () => {
        if (latitude == undefined) {
            const { lat } = await Location.user(req);
            return lat
        } else {
            return latitude
        }
    };
    const lonData = async () => {
        if (longitude == undefined) {
            const { lon } = await Location.user(req);
            return lon
        } else {
            return longitude
        }
    };

    console.log(`++++LAT LON+++++++`)
    const lat = await latData();
    const lon = await lonData();
    console.log(lat, lon)
    User.update({ latitude: lat, longitude: lon }, {
        where: {
            id: req.session.user_id
        }
    })
        .then(async dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            console.log(dbUserData)
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    console.log('USER +++++++++++++++++++++++++')
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
                res.status(404).json({ message: 'No user found with this id' });
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
                res.status(404).json({ message: 'No user found with this id' });
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
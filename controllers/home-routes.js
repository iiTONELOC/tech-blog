const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// get all posts for homepage
router.get('/', (req, res) => {
    console.log('======================');
    Post.findAll({
        attributes: [
            'id',
            'post_data',
            'title',
            'created_at',

        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));

            res.render('homepage', {
                posts,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// get single post
router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post_data',
            'title',
            'created_at',

        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }

            const post = dbPostData.get({ plain: true });

            res.render('single-post', {
                post,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/sign-up', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('sign-up');
});

router.get('/view-comment/:id', (req, res) => {
    let logged = req.session.loggedIn
    if (!logged) {
        res.redirect('/login')
    }

    Post.findByPk(req.params.id, {
        attributes: [
            'id',
            'post_data',
            'title',
            'created_at',
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            if (dbPostData) {
                const post = dbPostData.get({ plain: true });
                res.render('view-comment', {
                    post,
                    loggedIn: true
                });
            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.get('/edit-comment/:id', (req, res) => {
    let user = req.session.user_id
    let logged = req.session.loggedIn
    if (!logged) {
        window.location.reload()
    }

    Comment.findByPk(req.params.id, {
        attributes: [
            'id',
            'comment_text',
            'post_id',
            'user_id',
            'created_at',
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            if (dbPostData) {
                const comment = dbPostData.get({ plain: true });
                if (comment.user_id === user) {
                    res.render('edit-comment', {
                        comment,
                        loggedIn: true
                    });
                } else {
                    res.redirect(`/view-comment/${comment.post_id}`);
                }

            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.get('/delete-comment/:id', (req, res) => {
    let user = req.session.user_id
    let logged = req.session.loggedIn
    if (!logged) {
        // res.redirect('/login')
        res.end()
        window.location.replace('/login')
    } else {
        Comment.findByPk(req.params.id, {
            attributes: [
                'id',
                'comment_text',
                'post_id',
                'user_id',
                'created_at',
            ],
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(dbPostData => {
            if (dbPostData) {
                const comment = dbPostData.get({ plain: true });
                if (comment.user_id === user) {
                    router.delete(`/deleteComment/:id`, withAuth, (req, res) => {
                        (comment.id = req.params.id);
                        Post.destroy({
                            where: {
                                id: req.params.id
                            }
                        })
                            .then(dbPostData => {
                                if (!dbPostData) {
                                    res.status(404).json({ message: 'No post found with this id' });
                                    return;
                                }
                                res.redirect(`/add-comment/${comment.post_id}`)(dbPostData);
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json(err);
                            });
                    });
                } else {
                    res.redirect(`/add-comment/${comment.post_id}`).end();
                }

            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
    }


});

module.exports = router;

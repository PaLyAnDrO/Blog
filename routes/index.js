var express = require('express');
const Post = require("../models/postModel").Post;
var router = express.Router();

/* GET home page. */
router.get('/index', function(req, res) {
  res.render('index', { title: 'Samurai\'s way\n Blog' });
});

router.post('/index', function(req, res) {
    res.redirect('/add-post');
});

router.get("/add-post", (req, res) => {
  res.render('add-post', {title: 'Welcome brave samurai'});
});

router.post("/add-post", (req, res) => {
  let { title, description } = req.body;

  let post = new Post({ title, description });
  post
      .save()
      .then(() => res.redirect("/posts"))
      .catch((error) => {
        console.log(error);
        res.render('error');
      });
});

router.get("/posts", (req, res) => {
  Post.find()
      .then((posts) => res.render("posts", { title: "Posts", posts}))
      .catch((error) => {
        console.log(error);
        res.render('error');
      });
});

router.get('/edit-posts/:id', (req, res) => {
  let id = req.params.id;
  const { title, description } = req.body;
  Post.findByIdAndUpdate(id, { title, description })
      .then(() => res.redirect("/posts" ))
      .catch((error) => {
        console.log(error);
        res.render('error');
      })
});

router.put("/edit-posts/:id", (req, res) => {
  let id = req.params.id;
  Post.findById(id)
      .then((post) => res.redirect("/posts"))
      .catch((error) => {
        console.log(error);
        res.render('error');
      });
});

router.delete("/posts/:id", (req, res) => {
  let id = req.params.id;
  Post.findByIdAndDelete(id)
      .then((posts) => res.render("posts", { title: "Post", posts }))
      .catch((error) => {
        console.log(error);
        res.render('error');
      })
})

module.exports = router;

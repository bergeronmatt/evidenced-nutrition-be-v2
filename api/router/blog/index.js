const express = require('express');
const Router = express.Router();
const Blog = require('./blog-model');

Router.get('/posts', (req, res) => {
    Blog.getPosts()
        .then(blog => {
            if(!blog) {
                res.status(400).json({errorMessage: 'Error retrieving blogs.'})
            }
            res.header("Access-Control-Allow-Origin", process.env.ORIGIN)
            res.status(200).json({message: 'Rendering Blog.', object: blog})
        })
        .catch(err => {
            res.status(500).json({errorMessage: 'Could not render blog data.', error: err})
        })
})

Router.get('/post/:name', (req, res) => {
    const { name } = req.params;
  
    try {
      Blog.getPost(name)
        .then((post) => {
          res.header("Access-Control-Allow-Origin", process.env.ORIGIN)
          res
            .status(200)
            .json({ message: 'Rendering post.', post: post });
        })
        .catch((err) =>
          res.status(500).json({
            message: 'Server Could not access blog post.',
            error: err,
          })
        );
    } catch (err) {}
  });

  Router.post('/new-post', (req, res) => {
      const payload = req.body.payload;

      console.log('Request body: ', payload)

      try{
      Blog.addPost(payload)
        .then(post => {
            if(!post) {
                res.status(400).json({message: 'Error, could not publish new post.'})
            } else {
              res.header("Access-Control-Allow-Origin", process.env.ORIGIN)
                res.status(200).json({message: 'New post published.'})
            }
        })
    } catch(err) {
        res.status(500).json({message: 'Server Error', error: err})
    }
  })

module.exports = Router;
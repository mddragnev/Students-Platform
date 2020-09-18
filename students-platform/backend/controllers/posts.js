const Post = require('../models/post');

exports.createPost = (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + '/images/' + req.file.filename,
    creator: req.userData.id,
    creatorEmail: req.userData.email
  });
  post.save()
    .then(result => {
      res.status(201).json({
        message: 'Post added successfully',
        post: {
          ...result,
          id: result._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Creating a post failed!'
      });
    });
};

exports.updatePost = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    imagePath = url + "/images/" + req.file.filename;
  }
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    creataor: req.userData.id,
    creatorEmail: req.userData.email
  });
  Post.updateOne({_id: req.params.id, creator: req.userData.id}, post)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json(result);
      } else {
        res.status(401).json({ message: "Not Authorized!"});
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Couldn`t update post!'
      });
    });
};

exports.getPosts = (req, res, next) => {
  // + converts string to number
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;

  if (pageSize && currentPage) {
    // not retrieving all posts, skipping some and limit the query
    postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  postQuery.find()
    .then( documents => {
      fetchedPosts = documents;
      return Post.count();
    })
    .then(count => {
      res.status(200).json({
        message: 'Posts fetched successfuly',
        posts: fetchedPosts,
        maxPosts: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching post failed'
      });
    });
};

exports.getPost = (req, res, next) => {
  Post.findById(req.params.id)
    .then( post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json( {message: 'Post not found!'});
      }
    }).
    catch(error => {
      res.status(500).json({
        message: 'Fetching post failed'
    });
  });
};

exports.getPostForUser = (req, res, next) => {
  const doc = Post.find({creator: req.userData.id})
    .then(posts => {
      console.log(posts);
      if (posts) {
        res.status(200).json(posts);
      } else {
        res.status(404).json( {message: 'Posts not found!'});
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Unable to fetch the posts'
      });
    });
};

exports.deletePost = (req,res,next) => {
  Post.deleteOne({
    _id: req.params.id,
    creator: req.userData.id
  })
    .then( result => {
      if (result.n > 0) {
        res.status(200).json({message : "Post Deleted!"});
      } else {
        res.status(401).json({ message: "Not Authorized!"});
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Deleting post failed!'
      });
    });
};

const express = require("express");
const router = express.Router();
const postService = require("../service/postService");

router.get("/posts", async (req, res, next) => {
  try {
    const post = await postService.getPosts();
    res.status(200).send(post).end();
  } catch (error) {
    next(error);
  }
});

router.get("/posts/:id", async (req, res, next) => {
  try {
    const post = await postService.getPost(req.params.id);
    res.status(200).send(post);
  } catch (error) {
    next(error);
  }
});

router.post("/posts", async (req, res, next) => {
  try {
    const newPost = await postService.savePost(req.body);
    res.status(201).send(newPost).end();
  } catch (error) {
    next(error);
  }
});

router.put("/posts/:id", async (req, res, next) => {
  try {
    const updatePost = await postService.updatePost(req.params.id, req.body);
    res.status(204).send(updatePost).end();
  } catch (error) {
    next(error);
  }
});

router.delete("/posts/:id", async (req, res, next) => {
  try {
    await postService.deletePost(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;

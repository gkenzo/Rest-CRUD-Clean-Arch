const postsData = require("../data/postsData");

exports.getPosts = async () => await postsData.getPosts();

exports.getPost = async (id) => {
  const post = await postsData.getPost(id);
  if (!post.length || !post) throw new Error("Post not found!");
  return post;
};

exports.savePost = async (req) => {
  const { title, content } = req;
  const existingPost = await postsData.getPostByTitle(title);
  if (existingPost.length) throw new Error("Post already exist!");
  return await postsData.savePost({ title, content });
};

exports.deletePost = async (id) => {
  await exports.getPost(id);
  return await postsData.deletePost(id);
};

exports.updatePost = async (id, req) => {
  await exports.getPost(id);
  const { title, content } = req;
  return await postsData.updatePost(id, title, content);
};

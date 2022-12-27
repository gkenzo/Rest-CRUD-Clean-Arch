const axios = require("axios");
const crypto = require("crypto");
const postService = require("../service/postService");
const { setUncaughtExceptionCaptureCallback } = require("process");

const request = (url, method, data) =>
  axios({ url, method, data, validateStatus: false });

const generate = () => crypto.randomBytes(20).toString("hex");

const baseUrl = "http://localhost:3000/posts";

describe("Posts", () => {
  it("should get posts", async () => {
    const post1 = await postService.savePost({
      title: generate(),
      content: generate(),
    });
    const post2 = await postService.savePost({
      title: generate(),
      content: generate(),
    });
    const post3 = await postService.savePost({
      title: generate(),
      content: generate(),
    });

    const response = await request(baseUrl, "get");
    expect(response.status).toBe(200);
    const posts = response.data;

    expect(posts).toHaveLength(3);

    await postService.deletePost(post1.id);
    await postService.deletePost(post2.id);
    await postService.deletePost(post3.id);
  });

  it("should be able to get a post", async () => {
    const post = await postService.savePost({
      title: generate(),
      content: generate(),
    });

    const response = await request(
      `http://localhost:3000/posts/${post.id}`,
      "get"
    );
    expect(response.status).toBe(200);

    const newPost = response.data[0];

    expect(newPost.id).toBe(post.id);
    expect(newPost.title).toBe(post.title);
    expect(newPost.content).toBe(post.content);

    await postService.deletePost(post.id);
  });

  it("should not be able to create a post with duplicated title", async () => {
    const data = { title: generate(), content: generate() };
    await postService.savePost(data);

    const response = await request(`http://localhost:3000/posts`, "post", data);

    expect(response.status).toBe(409);
  });

  it("should not be able to get a post that does not exists", async () => {
    const response = await request(`http://localhost:3000/posts/0`, "get");

    expect(response.status).toBe(404);
  });

  it("should be able to create a post", async () => {
    const post = { title: generate(), content: generate() };

    const response = await request(baseUrl, "post", post);

    expect(response.status).toBe(201);

    const newPost = response.data;

    expect(newPost.id).toBeDefined();
    expect(newPost.title).toBe(post.title);
    expect(newPost.content).toBe(post.content);

    await postService.deletePost(newPost.id);
  });

  it("should update a post", async () => {
    const post = await postService.savePost({
      title: generate(),
      content: generate(),
    });

    post.title = "123";
    post.content = "1234";

    const response = await request(
      `http://localhost:3000/posts/${post.id}`,
      "put",
      post
    );

    expect(response.status).toBe(204);

    const getPost = await postService.getPost(post.id);

    expect(getPost[0].title).toBe(post.title);
    expect(getPost[0].content).toBe(post.content);

    await postService.deletePost(post.id);
  });

  it("should be able to delete a post", async () => {
    const post = await postService.savePost({
      title: generate(),
      content: generate(),
    });

    expect(post.id).toBeDefined();

    const response = await request(
      `http://localhost:3000/posts/${post.id}`,
      "delete"
    );

    expect(response.status).toBe(204);
    expect(response.data).toBeFalsy();
  });

  it("should not be able to delete a post that does not exists", async () => {
    const response = await request(
      `http://localhost:3000/posts/1234`,
      "delete"
    );

    expect(response.status).toBe(404);
  });
});

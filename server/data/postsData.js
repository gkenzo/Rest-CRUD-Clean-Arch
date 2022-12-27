const database = require("../infra/database");

exports.getPosts = async () => {
  const [rows] = await database.promise().execute("select * from post;");
  return rows;
};

exports.getPost = async (id) => {
  const [rows] = await database
    .promise()
    .execute(`select * from post where id = ${id};`);
  return rows;
};

exports.getPostByTitle = async (title) => {
  const [rows] = await database
    .promise()
    .execute(`select * from post where title = '${title}';`);
  return rows;
};

exports.savePost = async (post) => {
  await database
    .promise()
    .query(
      `INSERT INTO post (title, content) VALUES ('${post.title}', '${post.content}');`
    );

  const [rows] = await database
    .promise()
    .query("SELECT * FROM `post` WHERE `id`= LAST_INSERT_ID()");

  return rows[0];
};

exports.deletePost = async (id) => {
  await database.promise().query(`DELETE FROM post where id = ${id}`);

  const [rows] = await database
    .promise()
    .query(`SELECT * FROM post WHERE id= ${id}`);

  return rows[0];
};

exports.updatePost = async (id, post) => {
  await database
    .promise()
    .query(
      `UPDATE post SET title = '${post.title}', content = '${post.content}' WHERE id = ${id};`
    );

  const [rows] = await database
    .promise()
    .query(`SELECT * FROM post WHERE id= ${id}`);

  return rows[0];
};

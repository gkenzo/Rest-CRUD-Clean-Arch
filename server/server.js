const express = require("express");

const app = express();

app.use(express.json());
app.use("/", require("./route/postsRoute"));
app.use((error, req, res, next) => {
  if (error.message === "Post already exist!") {
    return res.status(409).send(e).end();
  } else if (error.message === "Post not found!") {
    return res.status(404).send(e).end();
  }
  return res.status(500).send(e).end();
});
app.listen(process.env.PORT || 3000, () =>
  console.log(`Server running on port ${process.env.PORT || 3000}`)
);

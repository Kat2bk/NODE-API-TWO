// implement your posts router here
const express = require("express");

const data = require("./posts-model");

const router = express.Router();

// #### 1 [GET] /api/posts

// - If there's an error in retrieving the _posts_ from the database:
//   - respond with HTTP status code `500`.
//   - return the following JSON: `{ message: "The posts information could not be retrieved" }`.

router.get("/", async (req, res) => {
  try {
    const posts = await data.find();
    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "The posts information could not be retrieved" });
  }
});

// #### 2 [GET] /api/posts/:id

// - If the _post_ with the specified `id` is not found:

//   - return HTTP status code `404` (Not Found).
//   - return the following JSON: `{ message: "The post with the specified ID does not exist" }`.

// - If there's an error in retrieving the _post_ from the database:
//   - respond with HTTP status code `500`.
//   - return the following JSON: `{ message: "The post information could not be retrieved" }`.

router.get("/:id", async (req, res) => {
  try {
    const post = await data.findById(req.params.id);
    if (!req.params.id) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" });
    } else {
      res.status(200).json(post);
    }
  } catch (error) {
    res.status(500).json({ message: "The post info could not be retrieved" });
  }
});

// #### 3 [POST] /api/posts

// - If the request body is missing the `title` or `contents` property:

//   - respond with HTTP status code `400` (Bad Request).
//   - return the following JSON: `{ message: "Please provide title and contents for the post" }`.

// - If the information about the _post_ is valid:

//   - save the new _post_ the the database.
//   - return HTTP status code `201` (Created).
//   - return the newly created _post_.

// - If there's an error while saving the _post_:
//   - respond with HTTP status code `500` (Server Error).
//   - return the following JSON: `{ message: "There was an error while saving the post to the database" }`.

router.post("/", async (req, res) => {
  try {
    const postBody = {
      title: req.body.title,
      contents: req.body.contents,
    };

    if (!postBody.title || !postBody.contents) {
      res
        .status(400)
        .json({ message: "Please provide title and contents for the post" });
    } else {
      const newPost = await data.insert(postBody);
      res.status(201).json(newPost);
    }
  } catch (error) {
    res.status(500).json({
      message: "There was an error while saving the post to the database",
    });
  }
});

// #### 4 [PUT] /api/posts/:id

// - If the _post_ with the specified `id` is not found:

//   - return HTTP status code `404` (Not Found).
//   - return the following JSON: `{ message: "The post with the specified ID does not exist" }`.

// - If the request body is missing the `title` or `contents` property:

//   - respond with HTTP status code `400` (Bad Request).
//   - return the following JSON: `{ message: "Please provide title and contents for the post" }`.

// - If there's an error when updating the _post_:

//   - respond with HTTP status code `500`.
//   - return the following JSON: `{ message: "The post information could not be modified" }`.

// - If the post is found and the new information is valid:

//   - update the post document in the database using the new information sent in the `request body`.
//   - return HTTP status code `200` (OK).
//   - return the newly updated _post_.

router.put("/:id", async (req, res) => {
  try {
    const postBody = {
      title: req.body.title,
      contents: req.body.contents,
    };

    if (!postBody.title || !postBody.contents) {
      res
        .status(400)
        .json({ message: "Please provide title and contents for the post" });
    } else {
      const updated = await data.update(req.params.id, postBody);
      if (updated) {
        res.status(200).json(updated);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "The post info could not be modified" });
  }
});

// #### 5 [DELETE] /api/posts/:id

// - If the _post_ with the specified `id` is not found:

//   - return HTTP status code `404` (Not Found).
//   - return the following JSON: `{ message: "The post with the specified ID does not exist" }`.

// - If there's an error in removing the _post_ from the database:

//   - respond with HTTP status code `500`.
//   - return the following JSON: `{ message: "The post could not be removed" }`.

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await data.remove(req.params.id);
    if (!req.params.id) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" });
    } else {
      res.status(204).json(deleted);
    }
  } catch (error) {
    res.status(500).json({ message: "The post could not be removed" });
  }
});

// #### 6 [GET] /api/posts/:id/comments

// - If the _post_ with the specified `id` is not found:

//   - return HTTP status code `404` (Not Found).
//   - return the following JSON: `{ message: "The post with the specified ID does not exist" }`.

// - If there's an error in retrieving the _comments_ from the database:

//   - respond with HTTP status code `500`.
//   - return the following JSON: `{ message: "The comments information could not be retrieved" }`.

router.get("/:id/comments", async (req, res) => {
  try {
    const comments = await data.findCommentById(req.params.id);
    if (comments) {
      res.status(200).json(comments);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "The comments info could not be retrieved" });
  }
});

module.exports = router;

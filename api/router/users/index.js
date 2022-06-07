const express = require("express");
const Users = require("./user-model");
const Router = express.Router();
const { validateUser } = require('../auth/auth-model')

/* Get all Users */

Router.get("/", (req, res) => {
  Users.getUsers()
    .then((users) => {
      res.status(201).json({ message: `Rendering users...`, users });
    })
    .catch((err) => {
      res.status(401).json({ message: "Error retrieving user list: ", err });
    });
});

Router.get('/dashboard', validateUser, (req, res) => {
  res.status(200).json({ message: 'dashboard success' })
})

/* Find user by id */

Router.get("/:id", (req, res) => {
  let { id } = req.params;

  Users.findUser(id)
    .then((user) => {
      if (!product) {
        res.status(404).json({ message: "Could not find the user" });
      } else {
        res
          .status(201)
          .json({ message: `Rendering user information: ${user}` });
      }
    })
    .catch((err) => {
      res.status(501).
        json({ message: `Server error, could not retrieve user: ${err}` });
    });
});

/* Add a new User */

Router.post("/new_user", (req, res) => {
  let data = req.body;

  Users.addUser({ ...data })
    .then((user) => {
      res.status(201).json({ message: `Student successfully added: ${user}` });
    })
    .catch((err) => {
      res
        .status(501)
        .json({ message: `Server error, could not retrieve user: ${err}` });
    });
});

/* Update User */

Router.put("/:id", (req, res) => {
  let { id } = req.params;
  let { data } = req.body;
  Users.updateUser(data, id)
    .then((updated) => {
      if (!updated) {
        res.status(404).json({ message: "Could not find user to update." });
      } else {
        res.status(202),
          json({ message: `User successfully updated ${updated}` });
      }
    })
    .catch((err) => {
      res
        .status(502)
        .json({ message: `Server error, could not update user ${err}` });
    });
});

/* Delete a user */

Router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Users.findUser(id)
    .then((deleted) => {
      if (!deleted) {
        res
          .status(404)
          .json({ message: `Could not find the user with given information` });
      } else {
        res.status(201).json({ message: `User successfully deleted` });
      }
    })
    .catch((err) => {
      res
        .status(501)
        .json({ message: `Server error, could not delete user: ${err}` });
    });
});


module.exports = Router;

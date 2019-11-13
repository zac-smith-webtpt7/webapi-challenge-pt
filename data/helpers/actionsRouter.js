const express = require("express");
const actionDb = require("./actionsModel.js");

const router = express.Router();

// GET /api/actions
router.get("/", (req, res) => {
  actionDb
    .get()
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      res.status(500).json({
        message: `The action could not be retrieved`
      });
    });
});

// GET /:d
router.get("/:id", (req, res) => {
  const id = req.params.id;

  actionDb
    .get(id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      res.status(500).json({
        message: `The action with id ${id} cannot be retrieved`
      });
    });
});

// POST

// PUT /:id

// DELETE /:id

module.exports = router;

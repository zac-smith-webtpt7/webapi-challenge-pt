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
        message: `The action could not be retrieved. Error ${err}`
      });
    });
});

// GET /:id
router.get("/:id", validateUserId, (req, res) => {
  const id = req.params.id;

  actionDb
    .get(id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      res.status(500).json({
        message: `The action with id ${id} cannot be retrieved. Error ${err}`
      });
    });
});

// POST /
router.post("/", validateUser, (req, res) => {
  const action = req.body;
  actionDb
    .insert(req.body)
    .then(action => {
      res.status(201).json(action);
    })
    .catch(err => {
      res.status(500).json({
        message: `New action could not be added. Error ${err}`
      });
    });
});

// PUT /:id
router.put("/:id", validateUserId, (req, res) => {
  const id = req.params.id;
  const update = req.body;

  actionDb
    .update(id, update)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      res.status(500).json({
        message: `Action with id ${id} cannot be udated. Error ${err}`
      });
    });
});

// DELETE /:id
router.delete("/:id", validateUserId, validateUser, (req, res) => {
  const id = req.params.id;

  actionDb
    .remove(id)
    .then(action => {
      res.status(204).end();
    })
    .catch(err => {
      res.status(500).json({
        message: `Action with id ${id} cannot be deleted. Error ${err}`
      });
    });
});

// Custom middleware

function validateUserId(req, res, next) {
  const id = req.params.id;
  actionDb.get(id).then(user => {
    if (user) {
      next();
    } else {
      res.status(404).json({ message: `Invalid id of ${id}` });
    }
  });
}

function validateUser(req, res, next) {
  const action = req.body;
  if (!action.description || !action.notes) {
    return res.status(400).json({ message: "Missing description or notes" });
  } else {
    next();
  }
}

module.exports = router;

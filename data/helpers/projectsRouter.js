const express = require("express");
const projectsDb = require("./projectsModel.js");
const router = express.Router();

// GET  /api/projects
router.get("/", (req, res) => {
  projectsDb
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
router.get("/:id", (req, res) => {
  const id = req.params.id;

  projectsDb
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
  projectsDb
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
router.put("/:id", validateUserId, validateUser, (req, res) => {
  const id = req.params.id;
  const update = req.body;

  projectsDb
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
router.delete("/:id", validateUserId, (req, res) => {
  const id = req.params.id;

  projectsDb
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
  projectDb.get(id).then(user => {
    if (user) {
      next();
    } else {
      res.status(404).json({ message: `Invalid id of ${id}` });
    }
  });
}

function validateUser(req, res, next) {
  const project = req.body;
  if (!project.description || !project.name) {
    return res.status(400).json({ message: "Missing description or name" });
  } else {
    next();
  }
}

function validateAction(req, res, next) {
  const id = req.params.id;
  projectDd.getProjectActions(id).then(actions => {
    if (actions.length === 0) {
      res.status(404).json({ message: `No projects exist for action ${id}` });
    } else {
      next();
    }
  });
}

module.exports = router;

const router = require("express").Router();
const Thoughts = require("../../models/Thought");
const User = require("../../models/User");

// GET to get all thoughts
router.get("/", async (req, res) => {
  try {
    const data = await Thoughts.find();
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});

// GET to get a single thought by its _id
router.get("/:id", async (req, res) => {
  try {
    const data = await Thoughts.findById(req.params.id).populate("reactions");
    if (!data) {
      return res.json("no thought found");
    } else {
      res.json(data);
    }
  } catch (err) {
    res.json(err);
  }
});

// POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
router.post("/", async (req, res) => {
  try {
    const data = await Thoughts.create(req.body);
    await User.findByIdAndUpdate(
      { _id: req.user._id },
      { $push: { thoughts: data._id } },
      { new: true }
    );
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});

// PUT to update a thought by its _id
router.put("/:id", async (req, res) => {
  try {
    const data = await Thoughts.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    );
    if (!data) {
      res.json("no thought found");
    } else {
      res.json(data);
    }
  } catch (err) {
    res.json(err);
  }
});

// DELETE to remove a thought by its _id
router.delete("/:id", async (req, res) => {
  try {
    const data = await Thoughts.findByIdAndDelete({ _id: req.params.id });
    if (!data) {
      res.json("no thought found");
    } else {
      res.json("thought killed");
    }
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;

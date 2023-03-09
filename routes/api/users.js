const router = require("express").Router()
const User = require("../../models/User")
const { body, param, validationResult } = require("express-validator")

// GET all users
router.get("/", async (req, res, next) => {
  try {
    const data = await User.find()
    res.json({ status: "success", data })
  } catch (error) {
    next(error)
  }
})

// GET a single user by its _id and populated thought and friend data
router.get(
  "/:id",
  param("id").isMongoId().withMessage("Invalid user ID"),
  async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ status: "error", message: errors.array()[0].msg })
      }
      const data = await User.findById(req.params.id)
        .populate("thoughts")
        .populate("friends")
      if (!data) {
        return res.status(404).json({ status: "error", message: "User not found" })
      }
      res.json({ status: "success", data })
    } catch (error) {
      next(error)
    }
  }
)

// POST a new user:
router.post(
  "/",
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email"),
  async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ status: "error", message: errors.array()[0].msg })
      }
      const data = await User.create(req.body)
      res.status(201).json({ status: "success", data })
    } catch (error) {
      next(error)
    }
  }
)

// PUT to update a user by its _id
router.put(
  "/:id",
  param("id").isMongoId().withMessage("Invalid user ID"),
  async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ status: "error", message: errors.array()[0].msg })
      }
      const data = await User.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
      )
      if (!data) {
        return res.status(404).json({ status: "error", message: "User not found" })
      }
      res.json({ status: "success", data })
    } catch (error) {
      next(error)
    }
  }
)

// DELETE to remove user by its _id
router.delete("/:id", (req, res) => {
    User.findByIdAndDelete({
        _id: req.params.id
    })
        .then((data) => {
            if (!data) {
                res.json("no user with this id")
            } else {
                res.json("user killed")
            }
        })
})


module.exports = router
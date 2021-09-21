const router = require("express").Router();
const { Workout } = require("../models");

// create
router.post("/api/workouts", (req, res) => {
  Workout.create({req})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.put("/api/workouts/:id", async (req, res) => {
  try {
  const data = await Workout.updateOne(
    { "_id": req.params.id },
    { $addToSet: {"exercises":[req.body]} })
      res.json(data);
  } catch(err) {
    console.log(err);
      res.json(err);
    };
});

// Get last workout 
router.get("/api/workouts", async (req, res) => {
  try {
    const data = await Workout.aggregate([
      { $sort: { _id: -1 } },
      { $limit: 1 },
      {
        $addFields: { totalDuration: { $sum: "$exercises.duration" } },
      },
    ]);
    console.log(data);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

// get last 7 workouts 
router.get("/api/workouts/range", async (req, res) => {
  try {
    const data = await Workout.aggregate([
      { $sort: { _id: -1 } },
      { $limit: 7 },
      { $sort: { _id: 1 } },
      {
        $addFields: { totalDuration: { $sum: "$exercises.duration" } },
      },
    ]);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});



module.exports = router;

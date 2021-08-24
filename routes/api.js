const router = require("express").Router();
const Workout = require("../models/workout.js");

// create
router.post("/api/workouts", (req, res) => {
  Workout.create({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
  Workout.updateOne(
    { "_id": req.params.id },
    { $addToSet: {"exercises":[req.body]} })
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});


// Get last workout 
router.get("api/workouts", (req, res) => {
Workout.aggregate([
  {$sort: {_id:-1}},
  {$limit: 1},
  {
    $addFields: {totalDuration:{$sum: "$exercises.duration"}}
  }
])
.then((dbWorkout) => {
  res.json(dbWorkout);
})
.catch((err) => {
  console.log(err);
  res.json(err);
})
});

// get last 7 workouts 
router.get("api/workouts/range", (req, res) => {
  Workout.aggregate([
    {$sort: {_id:-7}},
    {$limit: 1},
    {
      $addFields: {totalDuration:{$sum: "$exercises.duration"}}
    }
  ])
  .then((dbWorkout) => {
    res.json(dbWorkout);
  })
  .catch((err) => {
    console.log(err);
    res.json(err);
  })
  });



module.exports = router;

const router = require('express').Router();
const Workout = require('../models/workout.js')

// create 
router.post('/api/workouts', (req, res) => {
  Workout.create({})
  .then((dbWorkout) => {
    res.json(dbWorkout);
  })
  .catch((err) => {
    res.json(err);
  });
});

// retrieve 
router.get("/api/workout", (req, res) => {
  Workout.find({})
    .sort({ date: -1 })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// update
router.put('/api/workouts/:id', ({body, params}, res) => {
Workout.findByIdAndUpdate(
  // more code here
)
})

//earlier async type
router.put('/:id', async (req, res) => {
  try {
    const workout = await Workout.findByIdAndUpdate(
      {
        type: req.body.type,
        name: req.body.name,
        duration: req.body.duration,
        weight: req.body.weight,
        reps: req.body.reps,
        sets: req.body.sets,
        distance: req.body.distance
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(dish);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
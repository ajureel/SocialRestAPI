const router = require('express').Router();
const {
  getAllThougthts,
  getThoughtByID,
  addThought,
  removeThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller');

// /api/Thoughts/
router.route('/')
    .get(getAllThougthts)
    .post(addThought);

// api/Thoughts/<thoughtId>
router.route('/:thoughtId').get(getThoughtByID);

// /api/Thoughts/<userId>/<ThoughtId>
router
  .route('/:userId/:ThoughtId')
  .put(addReaction)
  .delete(removeThought);

// /api/Thoughts/<userId>/<ThoughtId>/<ReactionId>
router.route('/:userId/:ThoughtId/:ReactionId').delete(removeReaction);

module.exports = router;

const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
  {
    // set custom id to avoid confusion with parent thought _id
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      trim: true,
      required: 'Thought is Required'
    //   must be between 1 and 280 char
    },

    userName: {
      type: String,
      trim: true,
      required: 'User Name is Required'
    },

// add reactions
reactions: [ReactionSchema],

    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length; //length of reactions array
  });

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;

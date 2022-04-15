const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: 'User Name is Required'
    },

    email: {
      type: String,
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },

    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],

    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      }],

    userCreated: {
      type: Date,
      default: Date.now
    }
  },
  {
    toJSON: {
      virtuals: true
    },
    id: false
  }
);

UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;

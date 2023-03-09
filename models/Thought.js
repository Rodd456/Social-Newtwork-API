const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema(
  {
    reactionId: {
      type: mongoose.Types.ObjectId,
      default: mongoose.Types.ObjectId,
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAt) => new Date(createdAt).toISOString(),
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: true,
  }
);

const thoughtSchema = new mongoose.Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAt) => new Date(createdAt).toISOString(),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [
      {
        type: reactionSchema,
        validate: [(reactions) => reactions.length <= 50, 'Reactions array exceeds maximum length of 50'],
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: true,
    versionKey: false,
    timestamps: true,
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;

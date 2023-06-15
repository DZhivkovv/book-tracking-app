import mongoose from 'mongoose'
import User from './user.model.js'

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is a required field"],
  },

  author: {
    type: String,
    required: [true, "Author is a required field"],
  },

  pages: {
    type: Number,
    required: [true, "Pages is a required field"],
  },

  status: {
    type: String,
    enum: ['Read', 'Reading', 'Wants to read'],
    required: [true, "Status is a required field"],
  },

  postedBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  
  username: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Book',bookSchema);

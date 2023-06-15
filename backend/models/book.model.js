import mongoose from 'mongoose'

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
});

export default mongoose.model('Book',bookSchema);

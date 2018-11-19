import mongoose from 'mongoose';
const { Schema } = mongoose;

const noteSchema = new Schema({
  title: {
      type: String,
      required: [true, 'Note titile is required']
  },
  content: {
      type: String,
      required: [true, 'Note content is required']
  }
});

export default mongoose.model('Note', noteSchema);
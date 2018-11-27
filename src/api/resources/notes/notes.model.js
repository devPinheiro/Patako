import mongoose from 'mongoose';
import paginate from 'mongoose-paginate'
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

noteSchema.plugin(paginate);
export default mongoose.model('Note', noteSchema);
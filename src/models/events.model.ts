import mongoose from 'mongoose';

const { Schema } = mongoose;

const EventSchema = new Schema({
  name: {
    type: String,
    max: [20, 'Event Name  is required']
  },
  dateAdded: {
    type: Date,
    default: Date.now
  }
});

export = mongoose.model('Event', EventSchema);

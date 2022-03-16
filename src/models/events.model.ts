import mongoose from 'mongoose';

const { Schema } = mongoose;

const EventSchema = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  category: {
    type: String
  },
  address: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  isVirtual: {
    type: Boolean,
    default: false
  }
});

export = mongoose.model('Event', EventSchema);

import mongoose from 'mongoose';
import validator from 'validator';
import {
  generateJWTToken,
  getUserFullName,
  saveUser,
  toAuthJSON,
  validatePassword
} from '@san/helpers/model.helpers';

const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: {
    type: String,
    max: [20, 'First Name must not be this long. Should have at-most 20 characters']
  },
  lastName: {
    type: String,
    max: [20, 'Last Name must not be this long. Should have at-most 20 characters']
  },
  contact: {
    unique: true,
    type: String,
    required: [true, 'This user wont be activated without a phone number'],
    min: [10, 'A phone number can have at-least 10 digits'],
    max: [13, 'Please enter a valid phone number, this is too long']
  },
  email: {
    type: String,
    lowercase: true,
    validate: (input: string) => validator.isEmail(input)
  },
  password: {
    type: String,
    required: [true, 'A password is required']
  },
  dateRegistered: {
    type: Date,
    default: Date.now
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

UserSchema.virtual('name').get(getUserFullName);

UserSchema.pre('save', saveUser);

UserSchema.methods.validatePassword = validatePassword;
UserSchema.methods.generateJWTToken = generateJWTToken;
UserSchema.methods.toAuthJSON = toAuthJSON;

export = mongoose.model('User', UserSchema);

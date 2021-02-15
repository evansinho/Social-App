import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
 user: {
   type: String,
   required: true,
 },
 email: {
  type: String,
  required: true,
  unique: true
 },
 password: {
  type: String,
  required: true,
 },
 avatar: {
  type: String,
 },
 date: {
  type: Date,
  default: Date.now
 }
})

export default mongoose.model('user', UserSchema);

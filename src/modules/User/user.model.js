import mongoose from 'mongoose';
import bcrypt from 'bcrypt'; 
import config from '../../config/index.js'; 
import { v4 as uuidv4 } from 'uuid';

const userSchema = new mongoose.Schema({
  userid: { type: String, default: uuidv4, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isBlocked: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  status: { type: String, enum: ['in-progress', 'blocked'], default: 'in-progress' },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.bcryptSaltRounds));
  next();
});

userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.role;
  delete userObject.status;
  delete userObject.isBlocked;
  delete userObject.isDeleted;
  return userObject;
};

userSchema.statics.isUserExistsByEmail = async function (email) {
  const existingUser = await this.findOne({ email }).select('+password');
  return existingUser;
};

export const User = mongoose.model('User', userSchema);
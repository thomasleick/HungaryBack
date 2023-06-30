import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

const saltRounds = 10;

interface User extends Document {
  name: string;
  email: string;
  pwd: string;
  avatar?: string;
  refreshToken?: string;
}

const userSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
  },
  pwd: {
    type: String,
    required: true,
    minlength: 3,
  },
  avatar: String,
  refreshToken: String,
});

userSchema.pre<User>('save', async function (next) {
  try {
    if (!this.isModified('pwd')) {
      return next();
    }
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(this.pwd, salt);
    this.pwd = hash;
    next();
  } catch (error) {
    next(error as Error);
  }
});

export default mongoose.model<User>('User', userSchema);
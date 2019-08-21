import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre("save", function(next) {
  return bcrypt.hash(this.password, 10, (error, hashed) => {
    this.password = hashed;
    next();
  });
});

UserSchema.methods.verifyPassword = password => {
  return bcrypt.compareSync(password, this.password);
};

export default model("User", UserSchema);

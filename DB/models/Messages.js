import { Schema, model } from "mongoose";

const MessageSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  user: { type: Schema.Types.ObjectId, ref: "User" }
});

export default model("Message", MessageSchema);

import { Schema, model } from "mongoose";

const ArticleSchema = new Schema({
  title: {
    type: string,
    required: true
  },
  body: {
    type: Text,
    required: true
  }
});

export default model("Article", ArticleSchema);

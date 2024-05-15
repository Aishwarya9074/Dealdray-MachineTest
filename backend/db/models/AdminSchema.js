import { Schema, model } from "mongoose";

const AdminSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  employee: [
    {
      type: Schema.Types.ObjectId,
      ref: "Employee"
    },
  ],
  
  role: {
    type: String,
    default: "admin",
  },
});
const Admin = model("Admin", AdminSchema);
export default Admin;

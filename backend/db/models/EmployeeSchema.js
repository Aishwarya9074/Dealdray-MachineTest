import { Schema, model } from "mongoose";

const EmployeeSchema = new Schema({
  employeename: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobileno: {
    type: Number,
    required: true,
  },
  Designation: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  course: [
    {
      type: String,
      required: true,
    },
  ],
  images: [{ type: String }],
  admin: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
});

const Employee = model("Employee", EmployeeSchema);
export default Employee;

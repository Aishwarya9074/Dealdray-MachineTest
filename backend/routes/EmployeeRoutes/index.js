import express from "express";
import Admin from "../../db/models/AdminSchema.js";
import Employee from "../../db/models/EmployeeSchema.js";
import upload from "../image.js";

const router = express.Router();
router.post("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const adminExists = await Admin.findById(id);
    if (!adminExists) {
      return res.status(403).json({ message: "admin not found" });
    }
    const employee = await Employee.create({ ...req.body, admin: id });
    return res.status(201).json(employee);
  } catch (error) {
    console.error("Error creating employee:", error);

    return res.status(500).json({ message: "Internal server error" });
  }
});
router.post("/image/:employeeId", upload.array("file", 5), async (req, res) => {
  try {
    const { employeeId } = req.params; // Extract homestay ID from request parameters
    const fileUrls = req.files.map(file => {
      return { employeeId, url: `http://localhost:7000/${file.filename}` }; // Include homestayId with each URL
    });
    return res.json(fileUrls);
  } catch (error) {
    console.error("Error uploading images:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
// Get an employee by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    return res.status(200).json(employee);
  } catch (error) {
    console.error("Error fetching employee:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
export default router;

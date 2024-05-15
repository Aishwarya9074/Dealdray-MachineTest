import express from "express";
import AdminRoutes from "../routes/AdminRoutes/index.js";
import EmployeeRoutes from "../routes/EmployeeRoutes/index.js"

const router = express.Router();
router.use('/admin',AdminRoutes)
router.use('/employee',EmployeeRoutes)


export default router;

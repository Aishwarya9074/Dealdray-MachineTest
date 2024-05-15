import express from 'express';
import Admin from '../../db/models/AdminSchema.js';
import jwt from 'jsonwebtoken';
import checkToken from '../../middleware/checkToken.js';
import bcrypt from 'bcrypt';
import Employee from '../../db/models/EmployeeSchema.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/signup', async (req, res) => {
    const body = { ...req.body };
    const admin = await Admin.findOne({ username: body.username });
    if (admin) {
        return res.status(403).json({ message: 'Username already taken' });
    }
    if (body.password !== body.confirmPassword) {
        return res.status(403).json({ message: 'Passwords do not match' });
    }
    try {
        const hashedPassword = await bcrypt.hash(body.password, 10);
        body.password = hashedPassword;
        await Admin.create(body);
        return res.status(201).json({ message: 'Signup successful' });
    } catch (e) {
        return res.status(403).json({ error: e.message });
    }
});

router.post('/login', async (req, res) => {
    const body = { ...req.body };
    const admin = await Admin.findOne({ username: body.username });
    if (!admin) {
        return res.status(403).json({ message: 'Username or password is incorrect' });
    }
    const isMatching = await bcrypt.compare(body.password, admin.password);
    if (!isMatching) {
        return res.status(403).json({ message: 'Username or password is incorrect' });
    }
    const token = jwt.sign(
        { role: "ADMIN", id: admin._id },
        process.env.SECRET_KEY,
        { expiresIn: '7d' }
    );
    return res.status(201).json({ message: 'Login successful', token: token });
});

router.get('/employees', checkToken("ADMIN"), async (req, res) => {
    try {
        const employees = await Employee.find({}, { password: 0 });
        return res.status(200).json({ employees });
    } catch (error) {
        return res.status(400).json({ message: "Internal server error" });
    }
});

router.get('/employee/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        return res.status(200).json(employee);
    } catch (error) {
        console.error('Error fetching employee:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.patch('/employees/:id', upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        const updatedField = req.body;

        if (req.file) {
            updatedField.image = req.file.path; // Handle image upload
        }

        console.log(`Updating employee with ID: ${id}`);
        console.log('Updated field:', updatedField);

        const updatedEmployee = await Employee.findByIdAndUpdate(id, updatedField, { new: true });

        if (!updatedEmployee) {
            console.log('Employee not found');
            return res.status(404).json({ message: 'Employee not found' });
        }

        console.log('Employee updated successfully');
        return res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmployee });
    } catch (error) {
        console.error('Error updating employee:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/employees/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEmployee = await Employee.findByIdAndDelete(id);
        if (!deletedEmployee) {
            return res.status(403).json({ message: 'Employee not found' });
        }
        return res.status(200).json({ message: 'Employee removed successfully' });
    } catch (error) {
        console.error('Error deleting employee:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;

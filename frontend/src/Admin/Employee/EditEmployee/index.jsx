import { useEffect, useState } from "react";
import "./edit.css";
import axios from "../../../utils/axios";
import { useParams } from "react-router-dom";
import Navbar from "../../../Components/Navbar";

const EditEmployee = () => {
    const [employee, setEmployee] = useState({
        employeename: '',
        email: '',
        mobileno: '',
        Designation: '',
        gender: '',
        course: '',
        image: null
    });
    const [edit, setEdit] = useState({});
    const { id } = useParams();

    const editChange = (e, key) => {
        if (key === 'image') {
            setEmployee({ ...employee, [key]: e.target.files[0] });
            setEdit({ ...edit, [key]: e.target.files[0] });
        } else {
            setEmployee({ ...employee, [key]: e.target.value });
            setEdit({ ...edit, [key]: e.target.value });
        }
    };

    const getEmployee = async () => {
        try {
            const response = await axios.get(`/employee/${id}`);
            console.log('Employee data:', response.data);
            setEmployee({ ...employee, ...response.data });
        } catch (error) {
            console.error("Error fetching employee data:", error);
        }
    };

    const editClick = async () => {
        try {
            const formData = new FormData();
            for (const key in edit) {
                formData.append(key, edit[key]);
            }
            console.log('FormData being sent:', formData);
            await axios.patch(`/admin/employees/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Employee updated successfully');
        } catch (error) {
            console.error("Error updating employee:", error);
        }
    };

    useEffect(() => {
        getEmployee();
    }, []);

    return (
       <div>
        <Navbar/>
        <div className="edit">
            <h1>Edit Employee Details</h1>
            <div className="edit-form">
                <label>Employee name</label>
                <input type="text" value={employee.employeename} onChange={(e) => editChange(e, 'employeename')} />
                
                <label>Email</label>
                <input type="email" value={employee.email} onChange={(e) => editChange(e, 'email')} />
                
                <label>Mobile No</label>
                <input type="text" value={employee.mobileno} onChange={(e) => editChange(e, 'mobileno')} />
                
                <label>Designation</label>
                <select value={employee.Designation} onChange={(e) => editChange(e, 'Designation')}>
                    <option value="">Select</option>
                    <option value="Manager">Manager</option>
                    <option value="Sales">Sales</option>
                    <option value="HR">HR</option>
                </select>
                
                <label>Gender</label>
                <div>
                    <label>
                        <input 
                            type="radio" 
                            value="Male" 
                            checked={employee.gender === 'Male'} 
                            onChange={(e) => editChange(e, 'gender')} 
                        />
                        Male
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            value="Female" 
                            checked={employee.gender === 'Female'} 
                            onChange={(e) => editChange(e, 'gender')} 
                        />
                        Female
                    </label>
                </div>
                
                <label>Course</label>
                <div>
                    <label>
                        <input 
                            type="radio" 
                            value="MCA" 
                            checked={employee.course === 'MCA'} 
                            onChange={(e) => editChange(e, 'course')} 
                        />
                        MCA
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            value="BCA" 
                            checked={employee.course === 'BCA'} 
                            onChange={(e) => editChange(e, 'course')} 
                        />
                        BCA
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            value="BSC" 
                            checked={employee.course === 'BSC'} 
                            onChange={(e) => editChange(e, 'course')} 
                        />
                        BSC
                    </label>
                </div>
                
                <label>Image</label>
                <input type="file" onChange={(e) => editChange(e, 'image')} />
                
                <button onClick={editClick}>Edit</button>
            </div>
        </div>
       </div>
    );
};
export default EditEmployee;

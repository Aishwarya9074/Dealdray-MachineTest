import { useState } from "react";
import axios from "../../utils/axios";
import "./createemployee.css"
import Navbar from "../../Components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const CreateEmployee = () => {
    const [create, setCreate] = useState({
        employeename: '',
        email: '',
        mobileno: '',
        Designation: '', // Changed to lowercase 'designation'
        gender: '',
        course: [], // Changed to an empty array for checkboxes
        images: null
    });
    const navigate=useNavigate()

    const onChange = (e, key) => {
        setCreate({ ...create, [key]: e.target.value });
    };

    const onCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setCreate({ ...create, course: [...create.course, value] });
        } else {
            setCreate({ ...create, course: create.course.filter(course => course !== value) });
        }
    };
    const addemployees = async () => {
        try {
            const response = await axios.post(`/employee/${localStorage.getItem('id')}`, create);
            console.log(response.data);
            navigate('/admin/employees');
            toast.success('Employee created successfully'); // Show success toast
        } catch (error) {
            console.error("Error creating employee:", error);
            toast.error('Error creating employee'); // Show error toast
        }
    };
    

    const imageChange = (e) => {
        const file = e.target.files[0];
        convertImageToBase64(file);
    };

    const convertImageToBase64 = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setCreate({ ...create, images: reader.result });
        };
    };


    return (
       <div>
        <Navbar/>
        <ToastContainer />
        <div className="createemployee">
            <h1>Create Employee</h1>
            <div className="form-emp">
                <label htmlFor="employeename">Name</label>
                <input type="text" id="employeename"  placeholder="name of employee.." onChange={(e) => onChange(e, 'employeename')} />
                
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="email.." id="email" onChange={(e) => onChange(e, 'email')} />
                
                <label htmlFor="mobileno">Mobile</label>
                <input type="text" placeholder="Mobileno.." id="mobileno" onChange={(e) => onChange(e, 'mobileno')} />
                
                <label htmlFor="designation">Designation</label>
                <select id="designation" onChange={(e) => onChange(e, 'Designation')}>
                    <option value="">Select Designation</option>
                    <option value="HR">HR</option>
                    <option value="MANAGER">Manager</option>
                    <option value="SALES">Sales</option>
                </select>
                
                <label>Gender</label>
                <div>
                    <label>
                        <input type="radio" value="F" name="gender" onChange={(e) => onChange(e, 'gender')} />
                        Female
                    </label>
                    <label>
                        <input type="radio" value="M" name="gender" onChange={(e) => onChange(e, 'gender')} />
                        Male
                    </label>
                </div>
                
                <label>Course</label>
                <div>
                    <label>
                        <input type="checkbox" value="BCA" onChange={onCheckboxChange} />
                        BCA
                    </label>
                    <label>
                        <input type="checkbox" value="MCA" onChange={onCheckboxChange} />
                        MCA
                    </label>
                    <label>
                        <input type="checkbox" value="BSC" onChange={onCheckboxChange} />
                        BSC
                    </label>
                </div>
                
                <label htmlFor="image">Image</label>
                <input type="file" id="image" onChange={imageChange} />
                
                <button  onClick={addemployees}>Create</button>
            </div>
        </div>
        {/* <footer className="footer">
          <p>&copy; 2024 Dealdray. All rights reserved.</p>
        </footer> */}
       </div>
    );
};

export default CreateEmployee;

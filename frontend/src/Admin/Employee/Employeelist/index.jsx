import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import { Table, Button, Input, Space } from 'antd';
import "./employeelist.css";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from '@ant-design/icons';
import Navbar from "../../../Components/Navbar";

const Employeelist = () => {
    const [employeelist, setEmployeelist] = useState([]);
    const editnavigate = useNavigate();
    const createemp=useNavigate()

    const getEmployeelist = async () => {
        try {
            const response = await axios.get(`/admin/employees`);
            console.log(response.data.employees);
            setEmployeelist(response.data.employees);
        } catch (error) {
            console.error("Error fetching employee list:", error);
        }
    };

    useEffect(() => {
        getEmployeelist();
    }, []);

    const editClick = (record) => {
        editnavigate(`/admin/edit/${record._id}`);
    };
    const createEmployeeClick=()=>{
        createemp('/admin/createemployee')
    }

    const dltClick = async (id) => {
        try {
            await axios.delete(`/admin/employees/${id}`);
            setEmployeelist(employeelist.filter((employee) => employee._id !== id));
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    };

    const columns = [
        {
            title: 'Image',
            dataIndex: 'images',
            key: 'images',
            render: (images) => <img src={images} alt="Employee" style={{ width: 50, height: 50 }} />,
        },
        {
            title: 'Name',
            dataIndex: 'employeename',
            key: 'employeename',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder="Search name"
                        value={selectedKeys[0]}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => confirm()}
                        style={{ width: 188, marginBottom: 8, display: 'block' }}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => confirm()}
                            size="small"
                            style={{ width: 90 }}
                        >
                            Search
                        </Button>
                        <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
                            Reset
                        </Button>
                    </Space>
                </div>
            ),
            filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
            onFilter: (value, record) => record.employeename.toLowerCase().includes(value.toLowerCase()),
            onFilterDropdownVisibleChange: (visible) => {
                if (visible) {
                    setTimeout(() => searchInput.select(), 100);
                }
            },
            render: (text) => text,
        },
        // Repeat similar configuration for other columns
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder="Search email"
                        value={selectedKeys[0]}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => confirm()}
                        style={{ width: 188, marginBottom: 8, display: 'block' }}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => confirm()}
                            size="small"
                            style={{ width: 90 }}
                        >
                            Search
                        </Button>
                        <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
                            Reset
                        </Button>
                    </Space>
                </div>
            ),
            filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
            onFilter: (value, record) => record.email.toLowerCase().includes(value.toLowerCase()),
            onFilterDropdownVisibleChange: (visible) => {
                if (visible) {
                    setTimeout(() => searchInput.select(), 100);
                }
            },
            render: (text) => text,
        },
        {
            title: 'Mobile No',
            dataIndex: 'mobileno',
            key: 'mobileno',
        },
        {
            title: 'Designation',
            dataIndex: 'Designation',
            key: 'Designation',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Course',
            dataIndex: 'course',    
            key: 'course',
        },
        {
            title: 'createDate',
            dataIndex: 'createDate',
            key: 'createDate',
            render: (createDate) => new Date(createDate).toLocaleDateString(),
        },
        // Repeat for other columns
        // ...
        {
            title: 'Edit',
            key: 'edit',
            render: (text, record) => (
                <i onClick={() => editClick(record)} className="fa-solid fa-pen-to-square"></i>
            ),
        },
        {
            title: 'Delete',
            key: 'delete',
            render: (text, record) => (
                <i onClick={() => dltClick(record._id)} className="fa-solid fa-trash"></i>
            ),
        },
    ];

    let searchInput;

    return (
<div>
<div className="list">
    <Navbar/>
    <div className="employee-list">
    <h1 className="list-heading">Employee List</h1>
</div>

            
            <div className="table-header">
            {/* <h1>Employee List </h1> */}
                <p>Totalcount:{employeelist.length}</p>
                <Button onClick={createEmployeeClick} type="primary">Create Employee</Button>
            </div>
            <div className="table-container">
            <Table dataSource={employeelist} columns={columns} className="custom-table" />

            </div>
        </div>
        <footer className="footer">
          <p>&copy; 2024 Dealdray. All rights reserved.</p>
        </footer>
</div>
    );
};

export default Employeelist;

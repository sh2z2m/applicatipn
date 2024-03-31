// EmployeeSearch.js
import React, { useState } from 'react';
import axios from 'axios';

const EmployeeSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [employees, setEmployees] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSearch = async () => {
        try {
            const response = await axios.get(`/employees/search?name=${searchTerm}`);
            if (response.data.length > 0) {
                setEmployees(response.data);
                setErrorMessage('');
            } else {
                setEmployees([]);
                setErrorMessage('Employee not found.');
            }
        } catch (error) {
            console.error('Error fetching employees:', error);
            setEmployees([]);
            setErrorMessage('Error fetching employees. Please try again later.');
        }
    };

    return (
        <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h2>Employee Search</h2>
            <input type="text" placeholder="Search by name" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <table style={{ marginTop: '20px', borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Position</th>
                        <th>Salary</th>
                        <th>Work Hours</th>
                        <th>Vacation Days</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.name}</td>
                            <td>{employee.age}</td>
                            <td>{employee.position}</td>
                            <td>{employee.salary}</td>
                            <td>{employee.work_hours}</td>
                            <td>{employee.vacation_days}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeSearch;

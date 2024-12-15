import React, { useEffect, useState } from "react";
import { Plus, Briefcase, Trash2 } from "lucide-react";
import axios from "axios";

const DepartmentNavigation = () => {
  const [departments, setDepartments] = useState([]);
  const [open, setOpen] = useState(false);
  const [newDepartment, setNewDepartment] = useState("");

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const getAllDepartment = async () => {
    try {
      const response = await axiosInstance.get("/departments");
      const { departments: fetchedDepartments } = response.data;
  
      console.log("Departments fetched:", fetchedDepartments);
  
      const colors = [
        "bg-blue-100",
        "bg-green-100",
        "bg-purple-100",
        "bg-pink-100",
        "bg-yellow-100",
        "bg-indigo-100",
      ];
  
      const mappedDepartments = fetchedDepartments.map((department, index) => ({
        id: department.department_id,
        name: department.department_name,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
  
      setDepartments(mappedDepartments);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const handleAddDepartment = async () => {
    if (!newDepartment.trim()) {
      alert("Please enter a valid department name.");
      return;
    }
  
    try {
      const resp = await axiosInstance.post("/new/department", { name: newDepartment });
      console.log("Backend response:", resp.data);
  
      const { newDepartment: createdDepartment } = resp.data;
  
      if (createdDepartment) {
        setDepartments((prevDepartments) => [
          ...prevDepartments,
          {
            id: createdDepartment.department_id,
            name: createdDepartment.department_name,
            color: "bg-blue-100",
          },
        ]);
      }
    } catch (error) {
      console.error("Error adding department:", error);
      alert("Failed to add the department. Check the console for details.");
    }
  };

  const handleCloseAdd = ()=>{
    handleAddDepartment();
    setOpen(false);
    setNewDepartment("");
  }

  useEffect(() => {
    getAllDepartment();
  }, [newDepartment]);  


  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-md p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Briefcase className="mr-3 text-gray-600" size={24} />
          Departments
        </h2>
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="space-y-3">
        {departments.map((dept) => (
          <div
            key={dept.id}
            className={`flex items-center justify-between p-3 rounded-lg ${dept.color} hover:shadow-md transition-shadow`}
          >
            <span className="font-medium text-gray-800">{dept.id}: {dept.name}</span>
            <button
              // onClick={() => handleDeleteDepartment(dept.id)}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-2xl">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Add New Department
            </h3>
            <input
              name="department"
              id="department"
              type="text"
              value={newDepartment}
              onChange={(e) => setNewDepartment(e.target.value)}
              placeholder="Enter department name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex space-x-3">
              <button
                onClick={() => setOpen(false)}
                className="flex-1 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCloseAdd}
                className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentNavigation;

import React, { useEffect, useState } from "react";
import './ProfileCard.css';
import { useConfirm } from "material-ui-confirm";
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
const Home = () => {
  const [errors, setErrors] = useState({});
  const confirm = useConfirm();

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const [tableData, setTableData] = useState([]);
  const [editClick, setEditClick] = useState(false);
  const [editIndex, setEditIndex] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs, [name]: value
    });
  };

  const validateInputs = () => {
    const validationErrors = {};
    
    if (!inputs.name) {
      validationErrors.name = "Username is required";
    }
    if (!inputs.email) {
      validationErrors.email = "Email is required";
    } else if (!/^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(inputs.email)) {
      validationErrors.email = "Email is invalid";
    }
    if (!inputs.phone) {
      validationErrors.phone = "Phone Number is required";
    } else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(inputs.phone)) {
      validationErrors.phone = "Please enter a valid phone number";
    }
    
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleBlur = () => {
    validateInputs();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateInputs()) return;

    if (editClick) {
      const tempTableData = [...tableData];
      Object.assign(tempTableData[editIndex], inputs);
      setTableData(tempTableData);
      setEditClick(false);
    } else {
      setTableData([...tableData, inputs]);
    }

    setInputs({ name: "", email: "", phone: "" });
  };

  const handleDelete = (index) => {
    confirm({
      title: "Are you ready to delete?",
      description: "This will delete your contact permanently.",
      confirmationText: "Delete now",
      cancellationText: "Not now",
    }).then(() => {
      const filterData = tableData.filter((_, i) => i !== index);
      setTableData(filterData);
    }).catch(() => {
      console.log("Cancellation delete.");
    });
  };

  const handleEdit = (index) => {
    const tempData = tableData[index];
    setInputs({ name: tempData.name, email: tempData.email, phone: tempData.phone });
    setEditClick(true);
    setEditIndex(index);
  };

  useEffect(() => {
    localStorage.setItem('inputs', JSON.stringify(inputs));
  }, [inputs]);

  const notify = () => {
    if (editClick) {
      toast.success("Data updated successfully", { toastId: "custom-id-yes" });
    }
  };

  return (
    <div className="profile-box">
      <h1 className="text-center">User Profile</h1>
      <div className="form-box">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label>Name</label>
            <input
              name="name"
              value={inputs.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.name && <span>{errors.name}</span>}
          </div>
          <div className="flex flex-col">
            <label>Email</label>
            <input
              name="email"
              value={inputs.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && <span>{errors.email}</span>}
          </div>
          <div className="flex flex-col">
            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              value={inputs.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              maxLength={10}
            />
            {errors.phone && <span>{errors.phone}</span>}
          </div>
          <button type="submit" onClick={notify} className="w-full bg-[#014d64] text-white mt-3 update mb-4">
            Save
          </button>
          <ToastContainer
            position="top-center"
            autoClose={1500}
            pauseOnHover={false}
            hideProgressBar={true}
            limit={1}
            theme="colored"
            transition={Slide}
          />
        </form>
      </div>
      <div className="table-responsive">
  <table className="text-center">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Phone Number</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody className="text">
      {tableData.map((item, i) => (
        <tr key={i}>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>{item.phone}</td>
          <td className="">
            <button onClick={() => handleEdit(i)} className="mr-3 text-yellow-300"><FontAwesomeIcon icon={faEdit} className="icon-edit"/></button>
            <button onClick={() => handleDelete(i)} className="text-red-500">  <FontAwesomeIcon icon={faTrash} className="icon-delete"/></button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import './ProfileCard.css'
import { useConfirm } from "material-ui-confirm";

const Home = () => {
    const confirm=useConfirm();


  const [inputs, setInputs] = useState({
    
    name: "Vaishnavi Nandkumar Shinde",
    email: "svaishnavi970@gmail.com",
    phone: "9867543423"
  });
  
  const [tableData, setTableData] = useState([]);
  const [editClick, setEditClick] = useState(false);
  const [editIndex, setEditIndex] = useState("");
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("inputs", inputs);
    if (editClick) {
      const tempTableData = tableData;
      Object.assign(tempTableData[editIndex], inputs);
      setTableData([...tempTableData]);
      setEditClick(false);
      setInputs({
        name: "",
        email: "",
        phone: "",
      });
    } else {
      setTableData([...tableData, inputs]);
      setInputs({
        name: "",
        email: "",
        phone : "",
      });
    }
  };

  const handleDelete = (index) => {
      confirm({
        title: "Are you ready to delete",
        description: "This will delete your contact permanently.",
        confirmationText: "Delete now",
        cancellationText: "Not now",
      })
        .then(() => {
          const filterData = tableData.filter((item, i) => i !== index);
          setTableData(filterData);        })
        .catch(() => {
          console.log("Cancellation delete.");
});
};
  //   const filterData = tableData.filter((item, i) => i !== index);
  //   setTableData(filterData);
  // };
  const handleEdit = (index) => {
    const tempData = tableData[index];

    setInputs({ name: tempData.name, email: tempData.email, phone:tempData.phone });
    setEditClick(true);
    setEditIndex(index);
  };



  useEffect(()=>{
    localStorage.setItem('inputs', JSON.stringify(inputs));
    }, [inputs]);
  return (
    <div className="profile-box">
      <h1 className="text-center">User Profile</h1>
      <div className="form-box">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label>Name</label>
            <input name="name" value={inputs.name} onChange={handleChange}    required/>
            
          </div>
          <div className="flex flex-col">
            <label>Email</label>
            <input name="email" value={inputs.email} onChange={handleChange} required/>
          </div>
          <div className="flex flex-col">
            <label>Phone Number</label>
            <input name="phone"      value={inputs.phone} onChange={handleChange}  required />
          </div>
          <button type="submit" className="w-full bg-[#014d64] text-white mt-3">
            {editClick ? "Update" : "Save"} 
            </button>
        </form>
      </div>
      <div>
        <table className="wi-full text-center">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody className="text">
            {tableData.map((item, i) => (
              <tr>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>

                <td>
                  <button
                    onClick={() => handleEdit(i)}
                    className="mr-3 text-yellow-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(i)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
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
   
   
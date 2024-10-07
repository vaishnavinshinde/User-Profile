import React, { useEffect, useState } from "react";
import './ProfileCard.css'
import { useConfirm } from "material-ui-confirm";
import { Slide, ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [errors, setErrors] = useState({})



    const confirm=useConfirm();


  const [inputs, setInputs] = useState({
    
    name: "",
    email: "",
    phone: ""
  });
  
  const [tableData, setTableData] = useState([]);
  const [editClick, setEditClick] = useState(false);
  const [editIndex, setEditIndex] = useState("");


  const handleChange = (e) => {
    const {name, value} = e.target;
    setInputs({
        ...inputs, [name] : value
    })
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("inputs", inputs);
    const validationErrors = {}
   
    
   
   
    if(!inputs.name) {
      validationErrors.name = "Username is required"

  }

  const emailRegex=/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

  if(!inputs.email) {
    validationErrors.email = "Email is required"
}
else  if(!emailRegex.test(inputs.email)){
    validationErrors.email = "Email is invalid"
}

if(!inputs.phone){
  validationErrors.phone="Phone Number is required"
}

 else if(!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(inputs.phone)){
   validationErrors.phone="Please enter a 10 digit phone number"
  }
  
   else if (editClick) {
    const tempTableData = tableData;
    Object.assign(tempTableData[editIndex], inputs);
    setTableData([...tempTableData]);
    setEditClick(false);
    setInputs({
      name: "",
      email: "",
      phone: "",
    });
    
  } 


  else {
      setTableData([...tableData, inputs]);
      setInputs({
        name: "",
        email: "",
        phone : "",
      });
    }
    setErrors(validationErrors)

    if(Object.keys(validationErrors).length === 0) {
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

    const customId = "custom-id-yes";

    const notify=()=>
      {
        toast.success("Data added successfully", {
          toastId: customId
        });

      }

  return (
    <div className="profile-box">
      <h1 className="text-center">User Profile</h1>
      <div className="form-box">
        <form onSubmit={handleSubmit} >
          <div className="flex flex-col">
            <label>Name</label>
            <input name="name" value={inputs.name} onChange={handleChange}    />
            { setTimeout(()=>{}) &&  errors.name && <span>{errors.name}</span> }

          </div>
          <div className="flex flex-col">
            <label>Email</label>
            <input name="email" value={inputs.email} onChange={handleChange} />
            {errors.email &&  <span>{errors.email} </span> }  

          </div>
          <div className="flex flex-col">
            <label>Phone Number</label>
            <input name="phone"      value={inputs.phone} onChange={handleChange}   />
            {errors.phone && <span>{errors.phone}</span>}  

          </div>
          <button type="submit" className="w-full bg-[#014d64] text-white mt-3"  >
save            </button>
            <button type="submit"className="update"onClick={notify}>Update</button>
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
   
   
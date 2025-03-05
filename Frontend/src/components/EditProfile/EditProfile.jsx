import React, { useContext, useState, useEffect } from "react";
import "./EditProfile.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios"; 
// import { toast } from "react-toastify"; 
import { toast } from "react-hot-toast";

const EditProfile = () => {
  const { url, userData } = useContext(StoreContext);
  const [input, setInput] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    city:"",
    country:"",
  });

  useEffect(() => {
    if (userData) {
      setInput({
        name: userData.name || "",
        email: userData.email || "",
        contact: userData.contact || "",
        address: userData.address || "",
        city: userData.city || "",
        country: userData.country || "",
      });
    }
  }, [userData]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const editData = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("_id", userData?._id);
    formData.append("name", input.name);
    formData.append("email", input.email);
    formData.append("contact", input.contact);
    formData.append("address", input.address);
    formData.append("city", input.city);
    formData.append("country", input.country);

    try {
      const response = await axios.post(`${url}/api/user/updateUser`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.status) {
        setInput({
          name: "",
          email: "",
          contact: "",
          address: "",
          city:"",
          country:"",
        });
        toast(response.data.message);
      } else {
        toast(response.data.message);
      }
    } catch (error) {
      toast("Please Try Again");
      // console.log("Error updating item:", error.response?.data || error.message);
    }
  };

  return (
    <div className="edit-profile-main">
      <div className="edit-content">
        <h4>Edit Profile</h4>
        <form onSubmit={editData}>
          <table>
            <tbody>
              <tr>
                <td>Name </td>
                <td>
                  <input type="text" name="name" value={input.name} onChange={onChangeHandler} />
                </td>
              </tr>
              <tr>
                <td>Email </td>
                <td>
                  <input type="email" name="email" value={input.email} onChange={onChangeHandler} readOnly />
                </td>
              </tr>
              <tr>
                <td>Mobile Number </td>
                <td>
                  <input type="number" name="contact" value={input.contact} onChange={onChangeHandler} />
                </td>
              </tr>
              <tr>
                <td>Address </td>
                <td>
                  <textarea name="address" value={input.address} onChange={onChangeHandler} />
                </td>
              </tr>
              <tr>
                <td>City </td>
                <td>
                  <textarea name="city" value={input.city} onChange={onChangeHandler} />
                </td>
              </tr>
              <tr>
                <td>Country </td>
                <td>
                  <textarea name="country" value={input.country} onChange={onChangeHandler} />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <button type="submit">Submit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;

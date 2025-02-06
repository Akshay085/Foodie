import React, { useEffect, useContext, useState } from "react";
import "./UserProfile.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserProfile = () => {
  const { userData, setUserData, url } = useContext(StoreContext);
  console.log(userData);

  const [input, setInput] = useState({
    _id: "",
    name: "",
    email: "",
    contact: "",
    address: "",
    city: "",
    country: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (userData) {
      setInput({
        _id: userData?._id || "",
        name: userData?.name || localStorage.getItem("name") || "",
        email: userData?.email || localStorage.getItem("email") || "",
        contact: userData?.contact || localStorage.getItem("contact") || "",
        address: userData?.address || localStorage.getItem("address") || "",
        city: userData?.city || localStorage.getItem("city") || "",
        country: userData?.country || localStorage.getItem("country") || "",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/api/user/updateUser`, input, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.status) {
        toast.success("Profile updated successfully!");
        console.log(response.data);
        setUserData(response.data.data);
        localStorage.setItem("user", JSON.stringify(response.data.data));
        setIsEditing(false);
      } else {
        toast.error("Failed to update profile.");
      }
    } catch (error) {
      console.log("Error updating profile:", error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="profile-main">
      <div className="content">
        <form onSubmit={handleSave}>
          <table>
            <tbody>
              <tr>
                <td>Name</td>
                <td>
                  <input
                    type="text"
                    name="name"
                    value={input.name}
                    onChange={handleChange}
                    readOnly={!isEditing}
                  />
                </td>
              </tr>
              <tr>
                <td>Email</td>
                <td>
                  <input
                    type="email"
                    name="email"
                    value={input.email}
                    readOnly
                  />
                </td>
              </tr>
              <tr>
                <td>Mobile Number</td>
                <td>
                  <input
                    type="number"
                    name="contact"
                    value={input.contact}
                    onChange={handleChange}
                    readOnly={!isEditing}
                  />
                </td>
              </tr>
              <tr>
                <td>Address</td>
                <td>
                  <textarea
                    name="address"
                    value={input.address}
                    onChange={handleChange}
                    readOnly={!isEditing}
                  />
                </td>
              </tr>
              <tr>
                <td>City</td>
                <td>
                  <textarea
                    name="city"
                    value={input.city}
                    onChange={handleChange}
                    readOnly={!isEditing}
                  />
                </td>
              </tr>
              <tr>
                <td>Country</td>
                <td>
                  <textarea
                    name="country"
                    value={input.country}
                    onChange={handleChange}
                    readOnly={!isEditing}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  {isEditing ? (
                    <>
                      <button type="submit" className="save-button">
                        Save
                      </button>
                      <button
                        type="button"
                        className="cancel-button"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="submit"
                        className="save-button"
                        style={{ visibility: "hidden" }}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="edit-button"
                        onClick={() => setIsEditing(true)}
                      >
                        Edit
                      </button>
                    </>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;

import React from 'react'
import './UserProfile.css'
const UserProfile = () => {
  return (
    <div className='profile-main'>
      
         
         <div className='content'>
         <form action="">
         <table>
            <tbody>
            <tr>
                <td>Name </td>
                <td><input type="text" placeholder='Enter Your Name' /></td>
            </tr>
            <tr>
                <td>Email </td>
                <td><input type="email" placeholder='Enter Your Email' /></td>
            </tr>
            <tr>
                <td>Mobile Number </td>
                <td><input type="number" placeholder='Enter Your Number' /></td>
            </tr>
            <tr>
                <td>Address </td>
                <td><textarea name="address" id="" placeholder='Enter Your Home Address'></textarea></td>
            </tr>
            </tbody>
         </table>
         </form>
         </div>
         
          
          </div>
    
  )
}

export default UserProfile
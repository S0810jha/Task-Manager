import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext.jsx'
import axios from 'axios'
import ProfileField from '../component/ProfileField.jsx'
import { toast } from 'react-toastify'

const Profile = () => {
  const { token, profileData, setProfileData, getProfileData, backendUrl } = useContext(AppContext);

  console.log(profileData)

  const [isEdit, setIsEdit] = useState(false)

  const updateProfile = async () => {
    try {
      const updateData = {
        name: profileData.name,
        phone: profileData.phone,
        address: profileData.address,
        dob: profileData.dob,
        gender: profileData.gender,
        age: profileData.age,
      }

      const { data } = await axios.put(
        backendUrl + '/api/user/update-profile',
        updateData,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      getProfileData();
    }
  }, [token])

  return profileData && (

    <div className="p-4 sm:p-8 min-h-screen">

      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-2xl p-6 md:p-10 border-t-4 border-blue-600">
        
        <div className="flex justify-between items-center pb-4 mb-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">USER PROFILE</h1>

          {isEdit ? (
            <button
              onClick={updateProfile}
              className="px-4 py-1 border border-primary text-1xl rounded-full mt-3 hover:bg-primary hover:bg-blue-600 hover:text-white transition-all duration-300">
              Save Info
            </button>

          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="px-4 py-1 border border-primary text-1xl rounded-full mt-3 hover:bg-primary hover:bg-blue-600 hover:text-white transition-all duration-300">
              Edit
            </button>

          )}
        </div>

 
        <div className="grid grid-cols-1 gap-6">

          <ProfileField
            label="Full Name"
            name="name"
            value={profileData.name}
            isEditing={isEdit}
            onChange={(e) =>
              setProfileData({ ...profileData, name: e.target.value })
            }
            placeholder="Enter full name"/>

          <ProfileField
            label="Email Address"
            name="email"
            value={profileData.email}
            isEditing={false}
            readOnly={true}
            placeholder="Enter email address"/>

          <ProfileField
            label="Phone Number"
            name="phone"
            value={profileData.phone}
            isEditing={isEdit}
            onChange={(e) =>
              setProfileData({ ...profileData, phone: e.target.value })
            }
            placeholder="Enter phone number"/>

          <ProfileField
            label="Address"
            name="address"
            value={profileData.address}
            isEditing={isEdit}
            onChange={(e) =>
              setProfileData({ ...profileData, address: e.target.value })
            }
            placeholder="Enter address"/>

          <ProfileField
            label="Age"
            name="age"
            value={profileData.age}
            isEditing={isEdit}
            onChange={(e) =>
              setProfileData({ ...profileData, age: e.target.value })
            }
            placeholder="Enter age"/>

          <ProfileField
            label="D.O.B"
            name="dob"
            value={profileData.dob}
            isEditing={isEdit}
            onChange={(e) =>
              setProfileData({ ...profileData, dob: e.target.value })
            }
            placeholder="Enter Your D.O.B "/>

          

          <div className="relative">

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>

            {isEdit ? (

              <select
                name="gender"
                value={profileData.gender || ''}
                onChange={(e) =>
                  setProfileData({ ...profileData, gender: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-blue-600 focus:border-blue-600">
                
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>

              </select>

            ) : (

              <div className="p-3 border rounded-lg text-sm text-gray-800 bg-white border-gray-300">
                {profileData.gender || 'Not set'}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  )
}

export default Profile;

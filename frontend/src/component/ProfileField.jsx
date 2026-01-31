import React from 'react'

const ProfileField = ({
  label,
  name,
  value,
  isEditing,
  readOnly = false,
  placeholder,
  type,
  onChange,      
}) => {

  return (
    <div className="relative">

      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      {isEditing && !readOnly ? (
        <input
          type={
            type
              ? type
              : name === 'age' || name === 'phone'
              ? 'number'
              : 'text'
          }
          name={name}
          value={value || ''}      
          onChange={onChange}     
          placeholder={placeholder}
          className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-blue-600 focus:border-blue-600"/>

      ) : (

        <div
          className={`p-3 border rounded-lg text-sm text-gray-800 ${
            readOnly
              ? 'bg-gray-100 border-gray-200 cursor-not-allowed'
              : 'bg-white border-gray-300'
          }`}>

          {value || 'Not set'}
        </div>
      )}
    </div>
  )
}

export default ProfileField

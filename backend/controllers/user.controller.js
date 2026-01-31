import userModel from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import validator from 'validator'


//API for registering a user
export const registerUser = async (req, res) => {
   
    try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "Missing Details"
      })
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Enter VALID Email"
      })
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Enter STRONG Password"
      })
    }

    // hash the password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const userData = {
      name,
      email,
      password: hashPassword
    };

    const newUser = new userModel(userData)
    const user = await newUser.save()

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.json({
      success: true,
      token
    })

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    })
  }
}


//API for logging in a user
export const loginUser = async (req, res) => {

    try {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })

    if (!user) {
      return res.json({
        success: false,
        message: "user not found"
      })
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({
        success: true,
        token
      })

    } else {
      res.json({
        success: false,
        message: "Invalid Credentials"
      })

    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    })

  }
}


//API for getting user details
export const getUser = async (req, res) => {

    try {
    const userId = req.userId;
    const profileData = await userModel.findById(userId).select("-password");

    if (!profileData) {
      return res.json({
        success: false,
        message: "User not found",
      })

    }
    
    res.json({
      success: true,
      profileData,
    })

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    })

  }
}


//API for updating user details
export const updateUser = async (req, res)=> {
    try {
    const userId = req.userId
    const { name, phone, address, dob, gender, age } = req.body;

    if (!name || !phone || !dob || !gender) {
      return res.json({
        success: false,
        message: "Data missing",
      })
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      dob,
      address,
      gender,
      age
    })

    res.json({
      success: true,
      message: "Profile Updated",
    })

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
}
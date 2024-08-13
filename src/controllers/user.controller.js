import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponce} from "../utils/ApiResponce.js"

const registerUser = asyncHandler(async (req, res) => {
   // get user details in frontend
   // validation - not empty
   // check if email already exists : username , email
   // check for image, check for avtar
   // uplod them in cloudinary,avtar
   // create user object - create entry in db
   // remove password and refresh token fild for responce
   // check for user creation
   // return respon

   const {fullname, email, username,password} = req.body;
   console.log("email:", email);

   if (fullname === "" || email === "" || username === "" || password === "") {
    throw new ApiError(400,'all fields are required');
    
   }

  const existedUser = User.findOne({
    $or :[{username}, {email}]
   })

   if (existedUser) {
    throw new ApiError(409,"username or email already exists");
    
   }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
     
    if (!avatarLocalPath ||!coverImageLocalPath) {
        throw new ApiError(400, "Both avatar and cover image are required");
        
    }
   
   const avtar = await uploadOnCloudinary(avatarLocalPath)
   const coverImage = await uploadOnCloudinary(coverImageLocalPath)


   if (!avtar ||!coverImage) {
     throw new ApiError(400, "Failed to upload images to cloudinary");
     
   }

   const user = await User.create({
    fullname,
    email,
    username : username.toLowercase(),
    password,
    avtar: avtar.url,
    coverImage: coverImage?.url || "",
   })

   const createdUser = await User.findById(user._id).select("-password -refreshToken");

   if (!createdUser) {
    throw new ApiError(500, "Failed to create user");
    
   }
   response.status(201).json(new ApiResponce(200,createdUser,"user created successfully"));
});



export {registerUser}
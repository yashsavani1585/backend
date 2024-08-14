import { v2 as cloudinary} from "cloudinary";
import fs from "fs";

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key:  process.env.CLOUDINARY_API_KEY, 
    api_secret:  process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (filePath) => {
    try {
        if(!filePath) return null;
        // upload the file to cloudinary
       const response = await cloudinary.uploader.upload(filePath,{
            resource_type: 'auto',
        })
        // file uploded successfully
        // console.log("File uploaded successfully on cloudinary", response.url);
        fs.unlinkSync(filePath) // delete the local file after upload to cloudinary  


        return response;
    } catch (error) {
        fs.unlinkSync(filePath)
         return null;
        
    }
}

export {uploadOnCloudinary};



// const uploadResult = await cloudinary.uploader
// .upload(
//     'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//         public_id: 'shoes',
//     }
// )
// .catch((error) => {
//     console.log(error);
// });

// console.log(uploadResult);
 

 import mongoose, {Schema} from "mongoose";

 import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

 const userSchema = new Schema(
    {
        username : {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim : true,
            index: true
        },
        email : {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim : true,
            
        },
        fullname : {
            type: String,
            required: true,
            trim : true,
            index: true
        },
        avtar :{
            type: String,
            required : true,
            // default: "https://gravatar.com/avatar/?d=identicon&s=200"
        },
        coverImage : {
            type: String,
            // default: "https://via.placeholder.com/1920x1080/000000/ffffff?text=No+Cover+Image"
        },
        watchHistory :[ {
            type: Schema.Types.ObjectId,
            ref: "Video",
        }
    ],
    password : {
        type: String,
        required: [true,'password is required'],
        
    },
    referenceToken : {
        this: String,
    }
        
    },
    { timestamps: true }
)

userSchema.pre('save', async function(next) {
    if(this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next();
});

userSchema.methods.isPasswordCoorect = async function(password) {
    
 return  await bcrypt.compare(password, this.password);
}


userSchema.methods.generateAccessToken = function() {
  return  jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname,
        // avtar: this.avtar,
        // coverImage: this.coverImage,
        // watchHistory: this.watchHistory,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY })
}
userSchema.methods.generateRefreshToken = function() {
    return  jwt.sign({
        _id: this._id,
        // email: this.email,
        // username: this.username,
        // fullname: this.fullname,
        // avtar: this.avtar,
        // coverImage: this.coverImage,
        // watchHistory: this.watchHistory,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY })
}
export const User = mongoose.model("User", userSchema);
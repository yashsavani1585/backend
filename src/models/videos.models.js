import mongoose, {Schema, Types} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
    {
        videofile : {
            Types: String,
            requvired: true,
            // unique: true,
            // match: /^[a-zA-Z0-9]+\.(mp4|mov|avi)$/
        },
        thumbnail : {
            type: String,
            required: true
        },
        owner : [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }],
        title : {
            type: String,
            required: true
        },
        description : {
            type: String,
            required: true
        },
        duration :{
            type : Number,
            required: true

        },
        views :{
            type : Number,
            default: 0

        },
        ispublished : {
            type: Boolean,
            required: true,
            // default: false
        }

}
 , { timestamps: true });

videoSchema.plugin(mongooseAggregatePaginate);
 export const Video = mongoose.model("Video", videoSchema);
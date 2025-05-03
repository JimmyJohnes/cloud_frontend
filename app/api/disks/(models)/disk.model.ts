import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {type: String, required: true},
    size: {type: String, required: true},
    isFixed: {type: Boolean, required: true},
    format:{type: String, required: true},
    location: {type: String, required: true},
})
export default mongoose.model("Disk",schema)
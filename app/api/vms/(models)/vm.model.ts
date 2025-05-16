import mongoose from "mongoose"

let VMSchema = new mongoose.Schema({
            name: {type: String, required: true},
            iso: {
                name: {type: String, required: true},
                location: {type: String, required: true}
            },
            memory: {type: Number, required: true},
            image: {type: String, required: true}
});

const VM = mongoose.models.VM || mongoose.model("VM", VMSchema);

export default VM;
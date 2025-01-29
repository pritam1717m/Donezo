import mongoose from "mongoose"

const dbConnect = (url : string) => {
    try {
        mongoose.connect(url).then(() => {
            console.log("mongodb is connected successfully...")
        })
    } catch (error) {
        console.error(error);
    }
}

export default dbConnect; 
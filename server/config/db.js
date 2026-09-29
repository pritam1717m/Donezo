import mongoose from "mongoose";

const connectDB = async ()=> {
    
        await mongoose.connect(process.env.MONGO_URI,{serverSelectionTimeoutMS:10000,});

        console.log("MongoDB connected");
};
//     }catch(error){
//         console.error("MongoDB connection failed:");
//         console.error(error.message);
         
//         if (error.reason?.servers) {
//             console.log('\n---Server Details---');
//             for (const [address, server] of error.reason.servers) {
//         console.log("\nServer:", address);
//         console.log("Type:", server.type);
//         console.log("Error:", server.error?.message || "No specific error");
//       }
//         }
        
//         process.exit(1);
//     } 
// };
export default connectDB;
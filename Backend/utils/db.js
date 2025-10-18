// import postgres from 'postgres'

// const ConnectionToDB = async () => {
//     try {

//         const connectionString = process.env.DATABASE_URL

//         const sqlConnect = postgres(connectionString);

//         if (postgres(connectionString)) {
//             console.log("Supabase connected Successfully");
//         }

//         console.log(sqlConnect);
//         return sqlConnect;

//     } catch (error) {
//         console.log(error);
//         throw error;
//     }
// }

// export default ConnectionToDB;


// import postgres from "postgres";

// const sql = postgres(process.env.SUPABASE_DB_URL, {
//     ssl: { rejectUnauthorized: false }, 
// });
// export default sql;

import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://infoillusionai_db_user:XJ3EHdjhA0l8Ng4X@fitnessbrand.tcriyun.mongodb.net/?retryWrites=true&w=majority&appName=fitnessbrand");
        console.log('mongodb connected successfully');
    } catch (error) {
        console.log(error);
    }
}
export default connectDB;
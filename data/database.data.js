import mongoose from 'mongoose';
// const DB_URI = "mongodb+srv://sourabhugawekar2704:aICmmiWk3Pq6YiaN@cluster0.pczchia.mongodb.net/";

export const connectDb = ()=>{
   
    mongoose.connect(process.env.DB_URI,{
        dbName:"FirstAPI",
    })
    .then(()=>{
        console.log("Database Connected ");
    })
    .catch((err) => {
        console.log(err);
    });
};
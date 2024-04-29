import {app} from "./app.js";
import {connectDb} from "./data/database.data.js";


connectDb();

app.listen(process.env.PORT_NUM,()=>{
    console.log(`Server is Starting on port ${process.env.PORT_NUM} in ${process.env.NODE_ENV} Mode `);
});
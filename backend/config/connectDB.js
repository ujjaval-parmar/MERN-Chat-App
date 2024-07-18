import mongoose from 'mongoose';


export const connectDB = async () => {

    try{
       await  mongoose.connect(process.env.DATABASE);
       
    const connection = mongoose.connection;

    connection.on('connected', ()=>{
        console.log('DB connected!');
    })

    connection.on('error', (err)=>{
        console.log("DB connect Failed!: ", err);
    })


    }catch(err){
        console.log('DB connect Failed!: ', err);
    }
   
}

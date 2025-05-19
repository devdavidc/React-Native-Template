import mongoose from 'mongoose'

export const connectDB = async () => {
  try{
    const conn = await mongoose.connect(process.env.DATABASE_URL);
    console.log(`Database connected ${conn.connection.host}`)
  }
  catch (error){
    console.log('Error connecting to database', error);
    process.exit(1); // Salir con error
  }
}
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL || "");
    console.log("Conexão com o MongoDB estabelecida com sucesso!");
  } catch (err) {
    console.error("Erro ao conectar ao MongoDB:", err);
  }
};

export default connectDB;
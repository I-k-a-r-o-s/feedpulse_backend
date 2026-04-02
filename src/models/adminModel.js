import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  isPassportNumberord: {
    type: String,
    required: true,
  },
});

const AdminModel = mongoose.model("AdminModel", adminSchema);

export default AdminModel;

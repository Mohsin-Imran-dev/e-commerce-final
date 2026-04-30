import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema({
    userId: { type: String, required: true }, 
    accountEmail: { type: String, required: true }, 
    newsletterEmail: { type: String, required: true, unique: true }, 
    date: { type: Number, default: Date.now }
});

const subscriberModel = mongoose.models.subscriber || mongoose.model("subscriber", subscriberSchema);
export default subscriberModel;
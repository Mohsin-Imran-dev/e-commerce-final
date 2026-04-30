import userModel from "../models/userModel.js"; // User info ke liye
import subscriberModel from "../models/subscriberModel.js";

const subscribeNewsletter = async (req, res) => {
  try {
    const { email, userId } = req.body;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const newSubscriber = new subscriberModel({
      userId: userId,
      accountEmail: user.email,
      newsletterEmail: email,
    });

    await newSubscriber.save();
    res.json({ success: true, message: "Subscribed successfully!" });
  } catch (error) {
    res.json({ success: false, message: "Already subscribed or server error" });
  }
};

const listSubscribers = async (req, res) => {
    try {
        const subscribers = await subscriberModel.find({});
        res.json({ success: true, subscribers });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


export {subscribeNewsletter, listSubscribers};

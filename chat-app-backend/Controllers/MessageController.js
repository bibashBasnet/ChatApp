const MessageModel = require("../Models/MessageModel");

exports.createMessage = async (req, res) => {
  const { message, sender, receiver } = req.body;
  try {
    const newMessage = new MessageModel({ message, sender, receiver });
    newMessage.save();
    return res.status(201).json({ message: "Message has been sent." });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

exports.getMessage = async (req, res) => {
  console.log("Api body", req.body);
  const { sender, receiver } = req.body;
  try {
    const messages = await MessageModel.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    });
    if (!messages) {
      return res.status(404).json({ message: "Message history is empty." });
    }
    return res.status(201).json({ messages });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

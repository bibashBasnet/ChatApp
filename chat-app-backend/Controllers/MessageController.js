const MessageModel = require("../Models/MessageModel");

exports.createMessage = async (req, res) => {
  const { message, receiver } = req.body;
  const { id } = req.user;
  const sender = id;
  try {
    const newMessage = new MessageModel({ message, sender, receiver });
    newMessage.save();
    return res.status(201).json({ message: "Message has been sent." });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

exports.getMessage = async (req, res) => {
  const { receiver } = req.body;
  const { id } = req.user;
  const sender = id;
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

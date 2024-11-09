import Notification from "../models/notification.model.js";

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;

    const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 })
    .populate({
      path: "from",
      select: "username profileImg"
    })

    await Notification.updateMany({to: userId}, {isRead: true});
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Internal Server Error: ", error);
  }
}

export const deleteNotifications = async (req, res) => {
  try {
    const userId = req.user._id;

    await Notification.deleteMany({ to: userId });

    res.status(200).json({ message: "Notificações deletadas com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Internal Server Error: ", error);
  }
}

export const deleteNotification = async (req, res) => {
  try {
    const notificationId = req.params.id;
    const userId = req.user._id;
    const notification = await Notification.findById(notificationId);

    if(!notification) {
      return res.status(404).json({ message: "Notificação não encontrada!" });
    }

    if (notification.to.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Não autorizado!" });
    }

    await Notification.findByIdAndDelete(notificationId);
    res.status(200).json({ message: "Notificação deletada com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Internal Server Error: ", error);
  }
}
// pages/api/webhook.js
export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    try {
      // Lấy dữ liệu từ webhook
      const data = req.body;

      // Xử lý dữ liệu nhận được từ webhook
      console.log("Webhook received:", data);

      // Trả về phản hồi thành công
      res.status(200).json({ message: "Webhook received successfully" });
    } catch (error) {
      console.error("Error processing webhook:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    // Nếu không phải POST, trả về 405 (Method Not Allowed)
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

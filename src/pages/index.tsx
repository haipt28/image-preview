import { SeoPage } from "@/components/seo";
import userData from "@/data/user.json";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_DOMAIN = process.env.NEXT_PUBLIC_SOCKET_DOMAIN as string;

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

export interface IHomePageProps {}

export default function HomePage(props: IHomePageProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const user = userData[imageIndex];

  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [fadeIn, setFadeIn] = useState(true);

  // socket
  const socketInitializer = async () => {
    socket = io(SOCKET_DOMAIN);
  };

  useEffect(() => {
    socketInitializer();
  }, []);

  const duration = 1; // seconds

  // useEffect(() => {
  //   // Lắng nghe sự kiện từ socket để nhận hình ảnh
  //   socket.on("newImage", (imageData) => {
  //     setFadeIn(false); // Bắt đầu quá trình chuyển đổi (mờ dần)
  //     setTimeout(() => {
  //       setCurrentImage(imageData); // Cập nhật hình ảnh mới
  //       setFadeIn(true); // Hiển thị hình ảnh với hiệu ứng mờ dần
  //     }, duration * 1000); // Thời gian khớp với animation
  //   });

  //   return () => {
  //     socket.off("newImage"); // Cleanup khi component unmount
  //   };
  // }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setImageIndex((prevIndex) => (prevIndex + 1) % userData.length);
        setFadeIn(true);
      }, duration * 1000); // Thời gian trễ khớp với thời gian animation
    }, 5000); // Thay đổi hình ảnh mỗi 5 giây

    return () => clearInterval(interval); // Cleanup interval
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center relative bg-[#475569]">
      <SeoPage title={"Trang chủ"} />
      <AnimatePresence>
        {user.image && (
          <motion.img
            key={user.id}
            src={user.image}
            alt={user.name}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: fadeIn ? 1 : 0, scale: fadeIn ? 1 : 0.95 }}
            transition={{ duration: duration }}
          />
        )}
      </AnimatePresence>

      {/* <div className="absolute bottom-10 left-10">
        <p className="text-[50px] drop-shadow-lg">Username: {user.name}</p>
        <p className="text-[24px] drop-shadow-lg">Phone: {user.phone}</p>
        <p className="text-[24px] drop-shadow-lg">Address: {user.address}</p>
      </div> */}
    </div>
  );
}

import userData from "@/data/user.json";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_DOMAIN = process.env.NEXT_PUBLIC_SOCKET_DOMAIN as string;

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;
export interface ITest1PageProps {}

export default function Test1Page(props: ITest1PageProps) {
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

  const duration = 0.8; // seconds

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
    }, 35000); // Thay đổi hình ảnh mỗi 5 giây

    return () => clearInterval(interval); // Cleanup interval
  }, []);

  const initial = { opacity: 0, scale: 0.95 };
  const animate = { opacity: fadeIn ? 1 : 0, scale: fadeIn ? 1 : 0.95 };
  const transition = { duration: duration };
  return (
    <div className="w-screen h-screen">
      <AnimatePresence>
        {user.image && (
          <div className="w-full h-full flex flex-col items-center justify-center relative bg-[#475569]">
            <Image
              src="/img/smart-building.png"
              alt="background-image"
              fill
              className="z-0 select-none"
            />
            <div className="backdrop-blur-[2px] z-10 w-full h-full flex">
              <div className="w-[40%] px-[10%] py-[5%] gap-10 flex flex-col">
                <Image
                  src="/logo/logo-oryza.png"
                  alt="logo"
                  width={1869 / 5}
                  height={746 / 5}
                  className="object-contain"
                />
                <motion.div
                  initial={initial}
                  animate={animate}
                  transition={transition}
                  className="w-fit"
                >
                  <p className="text-[24px] font-normal">
                    Lập trình viên FullStack
                  </p>
                  <p className="text-[44px] font-semibold uppercase">
                    Phan Thanh Hải
                  </p>
                  <div className="flex justify-center pt-7">
                    <Image
                      src="/img/haipt-camera.jpg"
                      alt="logo"
                      width={200}
                      height={200}
                      className="object-contain shadow-inner rounded-md "
                    />
                  </div>
                </motion.div>
              </div>
              <div className="w-[60%] p-[5%]">
                <motion.div
                  initial={initial}
                  animate={animate}
                  transition={transition}
                  className="w-full h-full rounded-lg relative"
                >
                  <Image
                    src="/img/haipt.jpg"
                    alt="logo"
                    fill
                    className="object-contain shadow-inner rounded-md "
                  />
                </motion.div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

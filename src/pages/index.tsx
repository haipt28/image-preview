import { SeoPage } from "@/components/seo";
import userData from "@/data/data-its-svg.json";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export interface IHomePageProps {}

export default function HomePage(props: IHomePageProps) {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [fadeIn, setFadeIn] = useState(true);

  const defaultUser = {
    id: "default",
    name: "default",
    image: "/user-svg/1.svg",
  };

  const duration = 1; // seconds

  const SOCKET_DOMAIN = process.env.NEXT_PUBLIC_SOCKET_DOMAIN as string;
  useEffect(() => {
    const companyId = process.env.NEXT_PUBLIC_COMPANY_ID;
    const socket = new WebSocket(`${SOCKET_DOMAIN}/${companyId}`);

    socket.onmessage = (event: any) => {
      const obj = JSON.parse(event.data);

      console.log("new data: ", obj);
      console.log("new data userID: ", obj?.data?.user_id);

      const user = userData.find((item) => item.id === obj?.data?.user_id);

      let imageData = defaultUser.image;

      if (user) {
        imageData = user.image;
      }

      setFadeIn(false);
      setTimeout(() => {
        setCurrentImage(imageData);
        setFadeIn(true);
      }, duration * 1000);
    };
    return () => {
      socket.close();
    };
  }, [SOCKET_DOMAIN]);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center relative bg-[#7dd3fc]">
      <SeoPage title={"Trang chủ"} />
      <AnimatePresence>
        {currentImage ? (
          <motion.img
            key={currentImage}
            src={currentImage}
            alt={currentImage}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: fadeIn ? 1 : 0, scale: fadeIn ? 1 : 0.95 }}
            transition={{ duration: duration }}
          />
        ) : (
          <Image
            src={defaultUser.image}
            alt={defaultUser.name}
            fill
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </AnimatePresence>
    </div>
  );
}

import { SeoPage } from "@/components/seo";
import userData from "@/data/data-its.json";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

export interface IHomePageProps {}

export default function HomePage(props: IHomePageProps) {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [fadeIn, setFadeIn] = useState(true);

  const defaultUser = {
    id: "default",
    name: "default",
    image: "/img/background.png",
  };

  // socket
  const socketInitializer = async () => {
    socket = io(SOCKET_DOMAIN);
  };

  useEffect(() => {
    socketInitializer();
  }, []);

  const duration = 1; // seconds

  const SOCKET_DOMAIN = process.env.NEXT_PUBLIC_SOCKET_DOMAIN as string;
  useEffect(() => {
    const companyId = "66e949f1e3a47cc183659228";
    const socket = new WebSocket(`${SOCKET_DOMAIN}/${companyId}`);

    socket.onmessage = (event: any) => {
      const obj = JSON.parse(event.data);

      console.log("new data: ", obj);

      const user = userData.find((item) => item.id === obj?.id);

      let imageData = "/img/background.png";

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
    <div className="w-screen h-screen flex flex-col items-center justify-center relative bg-[#475569]">
      <SeoPage title={"Trang chủ"} />
      <AnimatePresence>
        {currentImage ? (
          <motion.img
            key={currentImage}
            src={currentImage}
            alt={currentImage}
            className="absolute inset-0 w-full h-full object-fill"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: fadeIn ? 1 : 0, scale: fadeIn ? 1 : 0.95 }}
            transition={{ duration: duration }}
          />
        ) : (
          <Image
            src={defaultUser.image}
            alt={defaultUser.name}
            fill
            className="absolute inset-0 w-full h-full object-fill"
          />
        )}
      </AnimatePresence>
    </div>
  );
}

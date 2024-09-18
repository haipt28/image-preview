import { DefaultEventsMap } from "@socket.io/component-emitter";
import { memo, useEffect } from "react";
import io, { Socket } from "socket.io-client";
import * as React from "react";

const SOCKET_DOMAIN = process.env.NEXT_PUBLIC_SOCKET_DOMAIN as string;

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

const SocketGlobal = () => {
  const socketInitializer = async () => {
    socket = io(SOCKET_DOMAIN);
  };

  useEffect(() => {
    socketInitializer();
  }, []);

  const handleAddData = (data: any) => {
    //
  };

  // Thiết lập kết nối socket khi profile có giá trị
  useEffect(() => {
    const handleConnect = () => {
      // socket.emit('join', { UserId: profile.ID, sid: profile.SID });
    };

    socket.on("connect", handleConnect);

    return () => {
      socket.off("connect", handleConnect);
    };
  }, []);

  useEffect(() => {
    const handleNewVehicle = (data: any) => {
      handleAddData(data);
    };

    socket.on("new_vehicle", handleNewVehicle);

    return () => {
      socket.off("new_vehicle", handleNewVehicle);
    };
  }, [handleAddData]);

  return <></>;
};
export default memo(SocketGlobal);

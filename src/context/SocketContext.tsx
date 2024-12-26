
import { useContext, createContext, useEffect, useState, ReactNode, useMemo } from "react";
import { useSelector } from "react-redux";
import { io as socket, Socket } from "socket.io-client";
import { RootState } from "../Redux/store";
import { useFreelancer } from "./FreelancerContext/FreelancerData";

type SocketContextType = {
  socket: Socket | null;
  currentSocketId: string | null;
  onlineUser?: any;
  notifications?: any;
  offerNotification?: any;
};


const SocketContext = createContext<SocketContextType>({ socket: null, currentSocketId: null });

export const useSocket = () => useContext(SocketContext);

interface SocketProviderProps {
    children: ReactNode;
}

const API_URL = "http://localhost:7070";

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const [socketIo, setsocketIo] = useState<Socket | null>(null);
    const [currentSocketId, setSocketId] = useState<string | null>(null);
    const [onlineUser, setOnlineUser] = useState()
    const [notifications, setNotifications] = useState<any>()
    const [offerNotification, setOfferNotification] = useState<any>()
    const usersId = useSelector((state: RootState)=>state.user.userInfo?._id)
    const {freelancer} = useFreelancer()
    const freelancerId = freelancer?._id
    

    useEffect(() => {
      if(usersId || freelancerId){
        let sendingId  
          if(usersId){
            sendingId = usersId
          }
          const newSocket = socket(API_URL,{
            query:{
              userId: sendingId
            }
          });
          setsocketIo(newSocket);

          socketIo?.on('getOnlineUsers',(users)=>{
            setOnlineUser(users)
          })

          socketIo?.on('notifications',(data)=>{
            console.log(data,'notification data we got in socket io configuration in frontend')
            setNotifications(data)
          })

          socketIo?.on('offer',(data)=>{
            setOfferNotification(data)
          })
  
          newSocket.on("connect", () => {
              if (newSocket.id) { 
                  setSocketId(newSocket.id);
              }
          });
  
          return () => {
              newSocket.disconnect();
          };
      }else{
        if(socketIo){
          socketIo.close();
          setsocketIo(null)
        }
      }
        
    }, [usersId, freelancerId]);

    const socketMemo = useMemo(() => ({ socket: socketIo, currentSocketId, onlineUser, offerNotification, notifications }), [socketIo, currentSocketId, onlineUser, offerNotification, notifications]);

    return (
        <SocketContext.Provider value={socketMemo}>
            {children}
        </SocketContext.Provider>
    );
};



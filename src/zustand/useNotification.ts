import { create } from "zustand";

interface NotificationState {
    notifications: any | null;
    setNotifications: (notifications: any)=> void;
}

const useNotification = create<NotificationState>((set) => ({
    notifications: null,
    setNotifications: (notification: any) => {
        set({notifications: notification})
    }
}))

export default useNotification
import React, { useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, UseSelector } from "react-redux";
import { RootState } from "../Redux/store";

interface AdminProtectorProps {
    children: ReactNode;
}

const AdminProtector: React.FC<AdminProtectorProps> = ({ children }) => {
    const navigate = useNavigate();
    const admin = useSelector((state: RootState) => state.admin)
    console.log(admin, 'the data in admin is')
    useEffect(() => {
        if (admin.adminInfo?.email === undefined) {
            navigate('/admin', {
                state: { message: "Authorization failed" },
                replace: true
            })
        }
    }, [navigate, admin]);
    return admin ? <>{children}</> : null;
}
export default AdminProtector
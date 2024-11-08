import React, { useState } from 'react';
import { changePassword } from '../../Services/userServices/userAxiosCalls';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { toast } from 'sonner';

const UserChangePass = () => {
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const userData = useSelector((state: RootState) => state.user.userInfo);
    const id: string | undefined = userData?.userId;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const value = {
                currentPassword,
                newPassword,
                confirmPassword
            };
            if(newPassword !== confirmPassword){
                toast.error('password should be same')
            }else if(currentPassword == newPassword){
                toast.error('Current password and new password is same')
            }else{
            const response = await changePassword(value, id);
            setConfirmPassword('')
            setCurrentPassword('')
            setNewPassword('')
            console.log(response, 'response');
            if (response.success) {
                toast.success(response.message);
            } else {
                toast.error(response.message || 'Incorrect current password');
            }
        }
        } catch (error: any) {
            toast.error(error);
        }
    };

    return (
        <div className='bg-white w-full p-6 rounded-md shadow-md'>
            <h2 className='text-2xl font-semibold '>Change Password</h2>
            <form onSubmit={handleSubmit} className='pt-5 py-6'>
                <div className='space-y-3'>
                    <div className='space-y-1 flex flex-col items-start'>
                        <label className='text-xs font-medium px-1'>CURRENT PASSWORD</label>
                        <input
                            type=""
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className='w-full h-10 border border-gray-300 px-3 rounded-md mb-4'
                        />
                    </div>
                    <div className='space-y-1 flex flex-col items-start'>
                        <label className='text-xs font-medium px-1'>NEW PASSWORD</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className='w-full h-10 border border-gray-300 px-3 shadow-sm rounded-md mb-4'
                        />
                    </div>
                    <div className='space-y-1 flex flex-col items-start'>
                        <label className='text-xs font-medium px-1'>CONFIRM NEW PASSWORD</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className='w-full h-10 border border-gray-300 px-3 shadow-sm rounded-md mb-4'
                        />
                    </div>
                </div>
                <div className='flex justify-end pt-5'>
                    <button
                        type='submit'
                        className='px-4 py-2 bg-[#1AA803] text-white shadow-sm rounded-md'>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserChangePass;

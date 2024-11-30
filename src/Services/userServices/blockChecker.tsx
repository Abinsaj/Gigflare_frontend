import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getUserInfo } from './userAxiosCalls';
import { toast } from 'sonner';

const BlockChecker=() => {
  
    const navigate = useNavigate();
    const data = useSelector((state:RootState)=>state.user.userInfo)
        
    useEffect(()=>{
        const fetch = async()=>{
            let udata = await getUserInfo(data?._id)
            console.log(udata,'this is the udata')
            if(udata.data?.isBlocked === true){
                localStorage.removeItem('userInfo')
                navigate('/login')
            }
        }

        fetch()
    },[data]);
};

export default BlockChecker;

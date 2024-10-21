import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const BlockChecker=() => {
  
    const navigate = useNavigate();
    const isBlocked = useSelector((state:RootState)=>state.user.userInfo?.isBlocked);
    
    useEffect(()=>{
        if(isBlocked){
            navigate('/login');
        }
    },[isBlocked]);
};

export default BlockChecker;

const timeAgo = (date: any)=>{
    const now:any = new Date();
    const postData:any = new Date(date);
    const diff = Math.floor((now - postData)/1000);
    
    if(diff < 60){
        return `Posted ${diff} seconds ago`;
    }else if(diff < 600){
        const minute = Math.floor(diff/60);
        return `Posted ${minute} minute${minute > 1? 's':''} ago`
    } else if (diff < 86400) {
        const hours = Math.floor(diff / 3600);
        return `Posted ${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
        const days = Math.floor(diff / 86400);
        return `Posted ${days} day${days > 1 ? 's' : ''} ago`;
    }

}

export default timeAgo
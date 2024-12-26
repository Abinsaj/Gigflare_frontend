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

interface Options{
    year: 'numeric' | '2-digit'; 
  month: 'numeric' | '2-digit' | 'short' | 'long';
  day: 'numeric' | '2-digit'; 
}

const posted = (dates: any)=>{
    const date = new Date(dates)

    const options: Options = { year: 'numeric', month: 'short', day: '2-digit' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    return formattedDate
}

const getWeekDateRange = (week: number, year: number) => {
    const firstDayOfYear = new Date(year, 0, 1);
    
    const firstMonday = firstDayOfYear.getDate() - firstDayOfYear.getDay() + (firstDayOfYear.getDay() === 0 ? -6 : 1);
    const startOfWeek = new Date(year, 0, firstMonday + (week - 1) * 7);
  
    const today = new Date();
  
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
  
    if (today >= startOfWeek && today <= endOfWeek) {
      const formattedStart = startOfWeek.toLocaleDateString("default", { month: "short", day: "numeric" });
      const formattedEnd = today.toLocaleDateString("default", { month: "short", day: "numeric" });
      return `${formattedStart} - ${formattedEnd}`;
    }
  
    const formattedStart = startOfWeek.toLocaleDateString("default", { month: "short", day: "numeric" });
    const formattedEnd = endOfWeek.toLocaleDateString("default", { month: "short", day: "numeric" });
    return `${formattedStart} - ${formattedEnd}`;
  };
  
  
  

export  {timeAgo, posted, getWeekDateRange}
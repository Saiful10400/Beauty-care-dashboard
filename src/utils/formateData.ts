const formateDate=(data:string)=>{
   

    // Convert to Date object
    const dateObj = new Date(data);
    
    // Format the date using toLocaleDateString
    const formattedDate = dateObj.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    
    return formattedDate
}

export default formateDate
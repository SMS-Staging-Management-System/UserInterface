export default 
function time(unixTimestamp){

    let date = new Date(unixTimestamp);
    // Hours part from the timestamp
    let hours = date.getHours();
    // Minutes part from the timestamp
    let minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    let seconds = "0" + date.getSeconds();
    let year =  date.getFullYear();
    let month = date.getMonth();
    let day =  date.getDate();
    
    // Will display time in 10:30:23 format
    let formattedTime = `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
    let formatDate = `${month+1}/${day}/${year}`
    let formattedDate = `${formatDate} - ${formattedTime}`
    if(unixTimestamp > 0){
        return formattedDate;
    } else {
        return ''
    }

}
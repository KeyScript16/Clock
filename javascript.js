function showTime() {
    var date = new Date();
    var h = date.getHours(); 
    var m = date.getMinutes(); 
    var s = date.getSeconds(); 
    var session = "AM";

    // 1. Fix the "00" Hour and handle PM
    if (h == 0) { 
        h = 12; 
    } else if (h >= 12) {
        session = "PM";
        if (h > 12) h = h - 12;
    }

    // 2. Remove leading zero for Hour (h), but keep it for Minutes and Seconds
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    var time = h + ":" + m + ":" + s + " " + session;
    document.getElementById("MyClockDisplay").innerText = time;
    
    setTimeout(showTime, 1000);
}

showTime();

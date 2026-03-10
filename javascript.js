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


// 1. Setup Speech Recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true; // Keep listening
recognition.lang = 'en-US';

const startBtn = document.getElementById('start-btn');
const status = document.getElementById('ai-status');

// 2. Start listening when button is clicked
startBtn.onclick = () => {
    recognition.start();
    status.innerText = "I'm listening...";
};

// 3. What happens when you speak
recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
    
    // Check if you said "what time is it"
    if (transcript.includes("what time is it")) {
        speakTime();
    }
};

// 4. The "Siri" Voice
function speakTime() {
    const date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let session = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12; // Convert 0 to 12

    const timeString = `The time is ${h} ${m} ${session}`;
    
    let speech = new SpeechSynthesisUtterance(timeString);
    window.speechSynthesis.speak(speech); // This makes it talk!
}


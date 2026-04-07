let html5QrCode;
const verifyBtn = document.getElementById('btn-verify');
const rollNumberInput = document.getElementById('roll_number');
const overlay = document.getElementById('result-overlay');
const backdrop = document.querySelector('.overlay-backdrop');
const statusIcon = overlay.querySelector('.status-icon');
const statusMsg = overlay.querySelector('.status-msg');
const statusRoll = overlay.querySelector('.status-roll-number');

// Audio for successful scan (Synthesized beep)
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playBeep(type = 'success') {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    if (type === 'success') {
        oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); // A5
    } else if (type === 'duplicate') {
        oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // A4
    } else {
        oscillator.frequency.setValueAtTime(220, audioCtx.currentTime); // A3
    }
    
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.15);
}

function showResult(status, message, rollNumber) {
    overlay.className = ''; // Reset classes
    overlay.classList.add(status, 'show');
    backdrop.classList.add('show');
    
    statusMsg.innerText = message;
    statusRoll.innerText = rollNumber ? `Roll No: ${rollNumber}` : '';
    
    if (status === 'authorized') {
        statusIcon.innerText = '✅';
        playBeep('success');
    } else if (status === 'duplicate') {
        statusIcon.innerText = '⚠️';
        playBeep('duplicate');
    } else {
        statusIcon.innerText = '❌';
        playBeep('error');
    }

    // Hide overlay after 3 seconds
    setTimeout(() => {
        overlay.classList.remove('show');
        backdrop.classList.remove('show');
    }, 4000);
}

async function verifyStudent(roll_number) {
    if (!roll_number) return;
    
    try {
        const response = await fetch('/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ roll_number: roll_number })
        });
        const data = await response.json();
        showResult(data.status, data.message, roll_number);
        rollNumberInput.value = '';
    } catch (error) {
        console.error('Verification error:', error);
        alert('Verification failed. Server might be down.');
    }
}

// Scanner Initialization
function startScanner() {
    html5QrCode = new Html5Qrcode("reader");
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };

    html5QrCode.start(
        { facingMode: "environment" },
        config,
        (decodedText) => {
            // Success: decodedText contains roll number
            verifyStudent(decodedText);
            // Pause scanner for a moment after scan
            html5QrCode.pause(true);
            setTimeout(() => html5QrCode.resume(), 4500);
        },
        (errorMessage) => {
            // Ignore normal non-scanning errors
        }
    ).catch((err) => {
        console.error("Camera access failed:", err);
        document.getElementById('scanner-instruction').innerText = "Camera access denied. Use manual entry.";
    });
}

verifyBtn.addEventListener('click', () => {
    verifyStudent(rollNumberInput.value);
});

rollNumberInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        verifyStudent(rollNumberInput.value);
    }
});

// Start the scanner on page load
window.addEventListener('DOMContentLoaded', startScanner);

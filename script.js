const fileInput = document.getElementById('fileInput');
const playButton = document.getElementById('playButton');
const audioPlayer = document.getElementById('audioPlayer');
const currentSong = document.getElementById('currentSong');
const allSongsList = document.getElementById('allSongs'); // List for all songs
const playedSongsList = document.getElementById('playedSongs'); // List for played songs
const settingsIcon = document.getElementById('settingsIcon');
const settingsModal = document.getElementById('settingsModal');
const closeButton = document.querySelector('.close-button');
const applySettingsButton = document.getElementById('applySettings');
const bgColorInput = document.getElementById('bgColor');
const sidebarColorInput = document.getElementById('sidebarColor');
const buttonColorInput = document.getElementById('buttonColor');
const bodyTextColorInput = document.getElementById('bodyTextColor');
const sidebarTextColorInput = document.getElementById('sidebarTextColor');
const headingTextColorInput = document.getElementById('headingTextColor');
const buttonTextColorInput = document.getElementById('buttonTextColor');

let audioFiles = [];
let fileNames = [];
let playedSongs = []; // Array to keep track of played songs

// Set initial colors to green
document.body.style.backgroundColor = "#121212"; // Dark background
document.querySelector('.sidebar').style.backgroundColor = "#1c1c1c"; // Sidebar color
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.style.backgroundColor = "#1DB954"; // Button color
    button.style.color = "#ffffff"; // Button text color
});
document.body.style.color = "#ffffff"; // Body text color
document.querySelectorAll('.sidebar-title, .sidebar-subtitle').forEach(element => {
    element.style.color = "#1DB954"; // Sidebar text color
});
document.querySelectorAll('.main-title, .now-playing').forEach(element => {
    element.style.color = "#ffffff"; // Heading text color
});

// Handle file selection
fileInput.addEventListener('change', (event) => {
    audioFiles = Array.from(event.target.files).map(file => URL.createObjectURL(file));
    fileNames = Array.from(event.target.files).map(file => file.name);
    
    // Store in localStorage
    localStorage.setItem('audioFiles', JSON.stringify(audioFiles));
    localStorage.setItem('fileNames', JSON.stringify(fileNames));
    
    // Update the all songs list after loading new files
    updateAllSongsList();
});

// Play a random audio file
playButton.addEventListener('click', playRandomSong);

// Function to play a random song
function playRandomSong() {
    if (audioFiles.length > 0) {
        const randomIndex = Math.floor(Math.random() * audioFiles.length);
        playSong(randomIndex);
    } else {
        alert('Please select MP3 files first.');
    }
}

// Function to play a song by index
function playSong(index) {
    audioPlayer.src = audioFiles[index];
    currentSong.textContent = fileNames[index]; // Display the name of the current song
    audioPlayer.play();
    
    // Add to played songs list if not already present
    if (!playedSongs.includes(fileNames[index])) {
        playedSongs.push(fileNames[index]);
        updatePlayedSongsList();
    }
}

// Update the all songs list in the sidebar
function updateAllSongsList() {
    allSongsList.innerHTML = ''; // Clear the list
    fileNames.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = song;
        li.addEventListener('click', () => playSong(index)); // Play the song when clicked
        allSongsList.appendChild(li);
    });
}

// Update the played songs list in the sidebar
function updatePlayedSongsList() {
    playedSongsList.innerHTML = ''; // Clear the list
    playedSongs.forEach(song => {
        const li = document.createElement('li');
        li.textContent = song;
        playedSongsList.appendChild(li);
    });
}

// Event listener for when the audio ends
audioPlayer.addEventListener('ended', playRandomSong); // Play a random song when the current song ends

// Settings modal functionality
settingsIcon.addEventListener('click', () => {
    settingsModal.style.display = 'block'; // Show the modal
});

closeButton.addEventListener('click', () => {
    settingsModal.style.display = 'none'; // Hide the modal
});

// Apply settings
applySettingsButton.addEventListener('click', () => {
    // Change background color
    document.body.style.backgroundColor = bgColorInput.value;
    
    // Change sidebar color
    document.querySelector('.sidebar').style.backgroundColor = sidebarColorInput.value;
    
    // Change button color
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.style.backgroundColor = buttonColorInput.value;
        button.style.color = buttonTextColorInput.value; // Set button text color
    });
    
    // Change body text color to match button color
    document.body.style.color = bodyTextColorInput.value; // Set body text color to button color
    
    // Change sidebar text color
    document.querySelectorAll('.sidebar-title, .sidebar-subtitle').forEach(element => {
        element.style.color = sidebarTextColorInput.value;
    });
    
    // Change heading text color
    document.querySelectorAll('.main-title, .now-playing').forEach(element => {
        element.style.color = headingTextColorInput.value;
    });
    
    settingsModal.style.display = 'none'; // Hide the modal after applying settings
});

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === settingsModal) {
        settingsModal.style.display = 'none';
    }
});
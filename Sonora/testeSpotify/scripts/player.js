let player;
const songList = [
  { title: "Blinding Lights", artist: "The Weeknd", videoId: "4NRXx6U8ABQ" },
  { title: "Save Your Tears", artist: "The Weeknd", videoId: "Cwkej79c_qI" },
  { title: "Levitating", artist: "Dua Lipa", videoId: "TUVcZfvy1Mk" }
];
let currentSongIndex = 0;
const playPauseBtn = document.getElementById('play-pause');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');
const progressBar = document.getElementById('progress-bar');
const volumeBar = document.getElementById('volume-bar');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');

// Load YouTube API
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: songList[currentSongIndex].videoId,
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// Player ready
function onPlayerReady(event) {
  loadSong(currentSongIndex);
  
  // Enable play/pause functionality here
  playPauseBtn.addEventListener('click', () => {
    if (player && player.getPlayerState() === YT.PlayerState.PLAYING) {
      player.pauseVideo();
      playPauseBtn.textContent = '⏯️';
    } else if (player) {
      player.playVideo();
      playPauseBtn.textContent = '⏸️';
    }
  });
}

// Handle player state change
function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    updateDuration();
  }
}

// Load song details
function loadSong(index) {
  songTitle.textContent = songList[index].title;
  songArtist.textContent = songList[index].artist;
  
  if (player) {
    player.loadVideoById(songList[index].videoId);
    // Remover a reprodução automática
    // player.playVideo(); 
  }
}

// Next song
document.getElementById('next').addEventListener('click', () => {
  currentSongIndex = (currentSongIndex + 1) % songList.length;
  loadSong(currentSongIndex); // Carrega a próxima música
});

// Previous song
document.getElementById('prev').addEventListener('click', () => {
  currentSongIndex = (currentSongIndex - 1 + songList.length) % songList.length;
  loadSong(currentSongIndex); // Carrega a música anterior
});

// Update progress and duration
function updateDuration() {
  const duration = player.getDuration();
  durationDisplay.textContent = formatTime(duration);
  progressBar.max = duration;

  const updateProgress = setInterval(() => {
    const currentTime = player.getCurrentTime();
    currentTimeDisplay.textContent = formatTime(currentTime);
    progressBar.value = currentTime;

    if (player.getPlayerState() === YT.PlayerState.ENDED) {
      clearInterval(updateProgress);
      nextSong();
    }
  }, 1000);
}

// Format time
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Volume control
volumeBar.addEventListener('input', () => {
  if (player) {
    player.setVolume(volumeBar.value);
  }
});

// Inicializa o reprodutor ao carregar a página
window.onload = () => {
  loadSong(currentSongIndex);
};

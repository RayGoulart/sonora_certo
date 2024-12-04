const createPlaylistButton = document.getElementById('create-playlist');
const addMusicButton = document.getElementById('add-music');
const playlistsContainer = document.getElementById('playlists');

let playlists = {};

createPlaylistButton.addEventListener('click', () => {
  const playlistName = document.getElementById('playlist-name').value;
  if (playlistName) {
    playlists[playlistName] = [];
    renderPlaylists();
    document.getElementById('playlist-name').value = '';
  }
});

addMusicButton.addEventListener('click', () => {
  const musicName = document.getElementById('music-name').value;
  const musicArtist = document.getElementById('music-artist').value;
  const musicUrl = document.getElementById('music-url').value;
  const playlistName = prompt('Para qual playlist você deseja adicionar a música?');

  if (playlistName in playlists && musicName && musicArtist && musicUrl) {
    playlists[playlistName].push({ name: musicName, artist: musicArtist, url: musicUrl });
    renderPlaylists();
    document.getElementById('music-name').value = '';
    document.getElementById('music-artist').value = '';
    document.getElementById('music-url').value = '';
  } else {
    alert('Playlist não encontrada ou informações da música inválidas.');
  }
});

function renderPlaylists() {
  playlistsContainer.innerHTML = '';
  for (const [playlistName, songs] of Object.entries(playlists)) {
    const playlistDiv = document.createElement('div');
    playlistDiv.classList.add('playlist');
    playlistDiv.innerHTML = `<h3>${playlistName} <button onclick="deletePlaylist('${playlistName}')">Excluir</button></h3>`;
    
    const songList = document.createElement('div');
    songs.forEach((song, index) => {
      const songDiv = document.createElement('div');
      songDiv.classList.add('music');
      songDiv.innerHTML = `${song.name} - ${song.artist} <button onclick="deleteSong('${playlistName}', ${index})">Excluir</button>`;
      songList.appendChild(songDiv);
    });
    
    playlistDiv.appendChild(songList);
    playlistsContainer.appendChild(playlistDiv);
  }
}

function deletePlaylist(playlistName) {
  delete playlists[playlistName];
  renderPlaylists();
}

function deleteSong(playlistName, songIndex) {
  playlists[playlistName].splice(songIndex, 1);
  renderPlaylists();
}

const searchSongs = () => {
    const searchText = document.getElementById('search-field').value;
    // console.log(searchText);
    const url = `https://api.lyrics.ovh/suggest/${searchText}`;
    // console log(url);

    // load data
    fetch(url) // fetching the url
        .then(res => res.json())
        .then(data => displaySongs(data.data)) // {object's property}
        .catch(error => displayError('Something went wrong!! Please try again later.'));
}

// load data with async, await
// const searchSongs = async() => {
//     const searchText = document.getElementById('search-field').value;
//     const url = `https://api.lyrics.ovh/suggest/${searchText}`;

//     // load data
//     const res = await fetch(url);
//     const data = await res.json();
//     displaySongs(data.data);
// }


const displaySongs = songs => {
    const songContainer = document.getElementById('song-container');
    // console.log(songs);
    songContainer.innerHTML = '';
    songs.forEach(song => {
        console.log(song);
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
                <source src="${song.preview}" type="audio/mpeg">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onClick="getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `;
        songContainer.appendChild(songDiv);
    });
}
const getLyric = async(artist, title) => {
    // console.log(artist, title);
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    // console.log(url);
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayLyrics(data.lyrics); // {object's property}
    }
    catch(error){
        displayError('Sorry!! failed to load lyrics, Please try again later.');
    }

}
const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('song-lyrics');
    lyricsDiv.innerText = lyrics;
}

const displayError = error => {
    const errorTag = document.getElementById('error-message');
    errorTag.innerText = error;
}
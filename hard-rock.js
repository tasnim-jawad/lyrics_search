let searchBtn =document.getElementById('searchBtn');
let output =document.getElementById('output');



searchBtn.addEventListener('click',getData)

function getData(){
    let searchText =document.getElementById('searchText').value;
    fetch('https://api.lyrics.ovh/suggest/'+searchText)
        .then(response => response.json())
        .then(data =>getResult(data))
        .catch(error =>alert('no lyrics'))
}

function getResult(allData){

    
    output.innerHTML = "";

    foundData = allData.data

    for (let i = 0; i < foundData.length; i++) {
        const dataInfo = foundData[i];

        let songTitle = dataInfo.title;
        let artistName = dataInfo.artist.name;

        output.innerHTML +=
        `<div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
                <h3 class="lyrics-name">${songTitle}</h3>
                <p class="author lead">Album by <span>${artistName}</span></p>
                <p class="author lead"><a href="${dataInfo.artist.picture}">Artist's picture</a></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button id="lyricsBtn" onclick="getLyrics(${i})" class="btn btn-success"><a href="#lyrics">Get Lyrics</a></button>
            </div>
        </div>`
        
        if (i >= 9) {
            console.log(i)
            break;
        }
        
    }

}

function getLyrics(songIndex) {
    document.getElementById('lyrics').innerHTML ="";

    let clickedSongTitle = foundData[songIndex].title
    let clickedSongArtist = foundData[songIndex].artist.name

    fetch('https://api.lyrics.ovh/v1/'+clickedSongArtist+'/'+clickedSongTitle)
        .then(response => response.json())
        .then(data =>printLyrics(data))

    function printLyrics(lyrics) {

        document.getElementById('lyrics').innerHTML = 
            `<div class="col-md-12 d-flex justify-content-center"  >
                <p ><pre>${lyrics.lyrics}</pre></p>
            </div>`
    }
}
const gallery = document.querySelector('.pictures');

url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&per_page=30&api_key=4e94dea62bb855253f145724d952eac2&tags=spring,nature&tag_mode=all&extras=url_m&format=json&nojsoncallback=1`

async function getData() {
  const pictures = await fetch(url);
  const data = await pictures.json();
  console.log(data);
  const photos = data.photos.photo;
    photos.forEach(photo => {
      let imgSrc = photo.url_m;
      let div = document.createElement('div');
      div.classList.add('gallery-img');
      div.style.backgroundImage = `url(${imgSrc})`;
      gallery.appendChild(div);
    });
}
getData();

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("input").focus();
});



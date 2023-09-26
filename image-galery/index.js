const gallery = document.querySelector('.pictures');
const input = document.getElementById('input');
const search = document.querySelector('.search-icon');

url = `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=30&api_key=4e94dea62bb855253f145724d952eac2&extras=url_m&format=json&nojsoncallback=1`;

async function getData() {
  let pictures = await fetch(url);
  let data = await pictures.json();
  console.log(data);
  gallery.innerHTML = '';
  let photos = data.photos.photo;
    photos.forEach(photo => {
      let imgSrc = photo.url_m;
      let div = document.createElement('div');
      div.classList.add('gallery-img');
      div.style.backgroundImage = `url(${imgSrc})`;
      gallery.appendChild(div);
    });
}
  function performSearch() {
      let searchValue = input.value;
      console.log(searchValue)
      url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&per_page=30&api_key=4e94dea62bb855253f145724d952eac2&tags=${input.value}&tag_mode=all&extras=url_m&format=json&nojsoncallback=1`;
      getData();
  }
    
  input.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
      performSearch();
    }
  });

  search.addEventListener('click', performSearch);

  document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("input").focus();
  });

getData();




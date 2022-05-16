L.mapquest.key = 'WwCTHXwl5JkAtD3rKLGhOo1wVOtsWWgP';
let key = 'WwCTHXwl5JkAtD3rKLGhOo1wVOtsWWgP';


let search = document.querySelector('button');

// 'map' refers to a <div> element with the ID map
let map = L.mapquest.map('map', {
  center: [53.480759, -2.242631],
  layers: L.mapquest.tileLayer('map'),
  zoom: 12
});

placeSearch({
  key: 'WwCTHXwl5JkAtD3rKLGhOo1wVOtsWWgP',
  container: document.getElementById('place-search-input')
});

let url = `http://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=Washington,DC`;



search.addEventListener('click', async function () {
  let location = document.getElementById('place-search-input').value;
  if (location != '') {
    console.log(`location: ${location}`);
    let response = await fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${location}`);
    let jsonR = await response.json();
    console.log(jsonR);
    let cord = jsonR.results[0].locations[0].latLng;
    map.remove();

    map = L.mapquest.map('map', {
      center: [cord.lat, cord.lng],
      layers: L.mapquest.tileLayer('map'),
      zoom: 12
    });
    map.addControl(L.mapquest.control({ position: 'bottomright' }));
  }
});

map.addControl(L.mapquest.control({ position: 'bottomright' }));

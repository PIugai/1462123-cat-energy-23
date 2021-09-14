/* global L:readonly */
const map = L.map('map')
  .setView({
    lat: 59.938635,
    lng: 30.323118,
  }, 16);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(map);

window.addEventListener('resize', function(event){
  var width = document.documentElement.clientWidth;

  if (width < 1220) {
    // set the zoom level to 10
    map.setView({
      lat: 59.938635,
      lng: 30.323118,
    }, 16);
  } else {
    // set the zoom level to 8
    map.setView({
      lat: 59.938635,
      lng: 30.315118,
    }, 15.5);
  }
});

const points = [
  {
    title: 'Кэт Энерджи',
    lat: 59.938635,
    lng: 30.323118,
  }
];

const createCustomPopup = (point) => {
  const balloonTemplate = document.querySelector('#balloon').content.querySelector('.balloon');
  const popupElement = balloonTemplate.cloneNode(true);

  popupElement.querySelector('.balloon__title').textContent = point.title;

  return popupElement;
};

points.forEach((point) => {
  const {lat, lng} = point;

  const icon = L.icon({
    iconUrl: '../img/pin.png',
    iconSize: [113, 106],
    iconAnchor: [57, 100],
  });

  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  marker
    .addTo(map)
    .bindPopup(
      createCustomPopup(point),
      {
        keepInView: true,
      },
    );
});

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

const navToggle = document.querySelector('.main-navigation__toggle');
const navigation = document.querySelector('.main-navigation');

navigation.classList.remove('main-navigation--no-js');
navigation.classList.remove('main-navigation--opened');
navigation.classList.add('main-navigation--closed');

navToggle.addEventListener('click', () => {
  navigation.classList.toggle('main-navigation--closed');
  navigation.classList.toggle('main-navigation--opened');
});

document.addEventListener('DOMContentLoaded', () => {

  const slider = document.querySelector('.slider');

  if (slider) {
    const sliderButtonBefore = slider.querySelector('.slider__button--before');
    const sliderButtonAfter = slider.querySelector('.slider__button--after');
    const sliderToggle = slider.querySelector('.slider__toggle');
    const sliderImageWrapper = slider.querySelector('.slider__image-wrapper');
    const sliderRange = slider.querySelector('.slider__range');
    const section = document.querySelector('.results');

    if (window.matchMedia('(max-width: 767px)').matches) {
      setMobileSlider();
    }

    if (window.matchMedia('(min-width: 768px)').matches) {
      setTabletSlider();
    }

    window.addEventListener('resize', () => {
      if (window.matchMedia('(max-width: 767px)').matches) {
        setMobileSlider();
      }

      if (window.matchMedia('(min-width: 768px)').matches) {
        setTabletSlider();
      }
    });

    function setMobileSlider() {
      sliderImageWrapper.style.width = '100%';
      sliderToggle.classList.add('slider__toggle--before');
      sliderRange.value = '0';

      sliderButtonAfter.onclick = (evt) => {
        evt.preventDefault();

        sliderToggle.classList.remove('slider__toggle--before');
        sliderToggle.classList.add('slider__toggle--after');
        sliderImageWrapper.style.width = '0%';
      }

      sliderButtonBefore.onclick = (evt) => {
        evt.preventDefault();

        sliderToggle.classList.remove('slider__toggle--after');
        sliderToggle.classList.add('slider__toggle--before');
        sliderImageWrapper.style.width = '100%';
      }
    }

    function setTabletSlider() {
      sliderImageWrapper.style.width = '50%';
      sliderToggle.classList.remove('slider__toggle--before');
      sliderToggle.classList.remove('slider__toggle--after');
      sliderRange.value = '50';

      const sliderWidth = slider.offsetWidth;
      const rangeWidth = sliderRange.offsetWidth - 34;

      sliderRange.oninput = () => {
        let wrapperWidth = (sliderWidth - rangeWidth) / 2 + (rangeWidth) * sliderRange.value / 100;
        sliderImageWrapper.style.width = `${wrapperWidth}px`;
        section.classList.remove('results--before');
        section.classList.remove('results--after');
      };

      sliderButtonBefore.onclick = (evt) => {
        evt.preventDefault();

        sliderRange.value = '0';
        sliderImageWrapper.style.width = '100%';
        section.classList.add('results--before');
        section.classList.remove('results--after');
      };

      sliderButtonAfter.onclick = (evt) => {
        evt.preventDefault();

        sliderRange.value = '100';
        sliderImageWrapper.style.width = '0%';
        section.classList.remove('results--before');
        section.classList.add('results--after');
      };
    }
  }

});

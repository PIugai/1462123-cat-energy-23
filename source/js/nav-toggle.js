const navToggle = document.querySelector('.main-navigation__toggle');
const navigation = document.querySelector('.main-navigation');

navigation.classList.remove('main-navigation--no-js');
navigation.classList.remove('main-navigation--opened');
navigation.classList.add('main-navigation--closed');

navToggle.addEventListener('click', () => {
  navigation.classList.toggle('main-navigation--closed');
  navigation.classList.toggle('main-navigation--opened');
});

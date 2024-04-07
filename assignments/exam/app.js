const form = document.querySelector('.color-form');
const body = document.querySelector('body');

function isValidHexColor(color) {
  const regex = /^#([0-9A-F]{3}){1,2}$/i;
  return regex.test(color);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const color = event.target[0].value;

  if (isValidHexColor(color)) {
    body.style.backgroundColor = color;
  } else {
    alert('It is not a hex color');
  }
});

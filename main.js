document.querySelector('button').onclick = () => {
  document.querySelector('h3').textContent = 'The mass of ' + document.querySelector('input').value + ' is ' + calc(document.querySelector('input').value).mass
}
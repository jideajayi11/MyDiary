document.querySelector('nav button').addEventListener('click', function() {
  const menu = document.querySelector('#menu-element').style.display;
  document.querySelector('#menu-element').style.display = menu=='block' ? 'none' : 'block';
});
const mq = window.matchMedia('(max-width: 768px)');
mq.addListener(function(changed) {
  if(changed.matches) {
    document.querySelector('#menu-element').style.display = 'none';
  }
  else {
    document.querySelector('#menu-element').style.display = 'block';
  }
});
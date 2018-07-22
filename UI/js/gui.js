document.querySelector('nav button').addEventListener('click', () => {

  const menu = document.querySelector('#menu-element').style.display;
  if (menu === 'block') {

    document.querySelector('#menu-element').style.display = 'none';

} else {

    document.querySelector('#menu-element').style.display = 'block';

}

});
const mq = window.matchMedia('(max-width: 768px)');
mq.addListener((changed) => {

  if (changed.matches) {

    document.querySelector('#menu-element').style.display = 'none';

} else {

    document.querySelector('#menu-element').style.display = 'block';

}

});
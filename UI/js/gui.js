function loadHeader () {

  const contentHeader = `<div class="container spread-in">
                          <div class="logo-title">MyDiary</div>
                          <div class="menus">
                            <nav>
                              <div id="menu-element">
                                  <span class="element"><a href="signUp.html">Sign Up</a></span>
                                  <span class="element"><a href="login.html">Login</a></span>
                              </div>
                            </nav>
                            <nav>
                              <button id="menu-icon">
                                  <span class="strip"></span>
                                  <span class="strip"></span>
                                  <span class="strip"></span>
                              </button>
                            </nav>
                          </div>
                        </div>`;
  document.getElementById('headerAuth').innerHTML = contentHeader;

  const contentFooter = `<div class="container">
                            &copy; 2018 MyDiaryApp. All rights reserved.
                        </div>`;
  document.getElementById('footerAuth').innerHTML = contentFooter;


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

}
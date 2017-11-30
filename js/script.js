document.addEventListener('scroll', scrollNavbar);

function scrollNavbar() {
    var menu = document.getElementById('topNavbar');
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        menu.classList.add('fixedNavbar');
        menu.classList.remove('animation');
    } else {
        menu.classList.remove('fixedNavbar');
        menu.classList.add('animation');
    }
}

document.addEventListener('scroll', scrollToTop);

function scrollToTop() {
    var topBtn = document.getElementById('topBtn');
    if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
        topBtn.style.display = 'block';
        document.body.classList.remove('animationEffect');
    } else {
        topBtn.style.display = 'none';
    }

    topBtn.onclick = function () {
        window.scrollTo(0, 0);
        document.body.className = 'animationEffect';
    };
}
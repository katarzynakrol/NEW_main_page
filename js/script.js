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

window.onload = function check() {
    var sendBtn = document.getElementById('send');
    var clearBtn = document.getElementById('clearBtn');
    var nameField = document.getElementById('nameField');
    var emailField = document.getElementById('emailField');
    var textField = document.getElementById('textField');
    nameField.addEventListener('blur', checkNameField);
    emailField.addEventListener('blur', checkEmailField);
    textField.addEventListener('blur', checkTextField);
    sendBtn.addEventListener('click', checkNameField);
    sendBtn.addEventListener('click', checkEmailField);
    sendBtn.addEventListener('click', checkTextField);
    clearBtn.addEventListener('click', clearField);
    counter();
}

function checkNameField() {
    var nameFieldValue = nameField.value;
    var nameTip = document.getElementById('nameTip');
    if (nameFieldValue === null || nameFieldValue === '' || nameFieldValue.search(/[a-z]+/i) === -1) {
        nameField.setAttribute('class', 'warning');
        nameTip.style.display = 'block';
        nameTip.innerHTML = 'Proszę wpisać imię i nazwisko';
        return false;
    } else {
        nameField.classList.remove('warning');
        nameTip.style.display = 'none';
        return true;
    }
}

function checkEmailField() {
    var reg = /^[-\w\.]+@([-\w]+\.)+[a-z]+$/i;
    var emailFieldValue = emailField.value;
    var emailTip = document.getElementById('emailTip');
    if (emailFieldValue === null || emailFieldValue === '') {
        emailField.setAttribute('class', 'warning');
        emailTip.style.display = 'block';
        emailTip.innerHTML = 'Proszę wpisać adres e-mail';
        return false;
    } else if (reg.test(emailFieldValue)) {
        emailField.removeAttribute('class');
        emailTip.innerHTML = '';
        return true;
    } else {
        emailField.setAttribute('class', 'warning');
        emailTip.style.display = 'block';
        emailTip.innerHTML = 'Niepoprawny adres e-mail';
        return false;
    }
}

function counter() {
    var text = document.getElementById('textField');
    var counter = document.getElementById('counter');

    text.onkeyup = text.onpaste = text.onchange = function () {
        counter.innerHTML = text.value.length;
    };
    clearBtn.onclick = function () {
        counter.innerHTML = '0';
    }
}

function checkTextField() {
    var textFieldValue = textField.value;
    var textTip = document.getElementById('textTip');
    if (textFieldValue === null || textFieldValue === '' || textFieldValue.search(/[a-z]+/i) === -1) {
        textField.setAttribute('class', 'warning');
        textTip.style.display = 'block';
        textTip.innerHTML = 'Proszę wpisać wiadomość';
        return false;
    } else {
        textField.classList.remove('warning');
        textTip.style.display = 'none';
        return true;
    }
}

function clearField() {
    nameField.removeAttribute('class');
    emailField.removeAttribute('class');
    textField.removeAttribute('class');
    nameTip.innerHTML = '';
    emailTip.innerHTML = '';
    textTip.innerHTML = '';
}
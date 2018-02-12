document.addEventListener('scroll', scrollNavbar);

/**
 * This function appends the menu to the top of the page when scrolling.
 */

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

/**
 * This function makes scroll to top button visible when the user has scrolled the page down by a set value.
 */

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

/**
 * This function adds event listeners to given DOM elements.
 */

window.onload = function check() {
    var sendBtn = document.getElementById('send');
    var clearBtn = document.getElementById('clearBtn');
    var nameField = document.getElementById('nameField');
    var emailField = document.getElementById('emailField');
    var textField = document.getElementById('textField');
    nameField.addEventListener('blur', checkNameField);
    emailField.addEventListener('blur', checkEmailField);
    textField.addEventListener('blur', checkTextField);
    sendBtn.addEventListener('click', checkAllFields);
    sendBtn.addEventListener('submit', checkAllFields);
    clearBtn.addEventListener('click', clearField);
    counter();
}

/**
 * This function checks all form fields by triggering given validation functions.
 */

function checkAllFields(e) {
    var checks = [];
    checkNameField(checks);
    checkEmailField(checks);
    checkTextField(checks);
    if (checks.includes(false) === false) {
        submitForm();
    }
}

/**
 * This function submits the form.
 */

function submitForm() {

    AWS.config.region = 'eu-west-1';
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'eu-west-1:5c63973c-b391-41f6-95ee-2a0391a03b02'
    });

    var lambda = new AWS.Lambda({
        region: 'eu-west-1',
        apiVersion: '2015-03-31'
    });
    // create JSON object for parameters for invoking Lambda function
    var lambdaParams = {
        FunctionName: 'emailNotificationRafalkrolxyz',
        InvocationType: 'RequestResponse',
        LogType: 'None',
        Payload: JSON.stringify({
            name: nameField.value,
            email: emailField.value,
            text: textField.value
        })
    };

    lambda.invoke(lambdaParams, function (error, data) {
        if (error) {
            alert('Something went wrong and your email has not been sent. Please reload the page and try again.')
            console.error(error);
        } else {
            alert('Your message has been sent successfully. Thank you!');
            console.log(data);
        }
    });
}

/**
 * This function checks if the input from the name field passes the set validation.
 */

function checkNameField(checks) {
    var nameFieldValue = nameField.value;
    var nameTip = document.getElementById('nameTip');
    if (Array.isArray(checks) === false) {
        checks = [];
    }
    if (nameFieldValue === null || nameFieldValue === '' || nameFieldValue.search(/[a-z]+/i) === -1) {
        nameField.setAttribute('class', 'warning');
        nameTip.style.display = 'block';
        nameTip.innerHTML = 'Proszę wpisać imię i nazwisko';
        checks.push(false);
        return checks;
    } else {
        nameField.classList.remove('warning');
        nameTip.style.display = 'none';
        checks.push(true);
        return checks;
    }
}

/**
 * This function checks if the input from the e-mail field passes the set validation.
 */

function checkEmailField(checks) {
    var reg = /^[-\w\.+']+@([-\w]+\.)+[a-z]+$/i; // Match names and surnames containing apostrophes (e.g. D'Andre O'Brien) and email aliases (e.g. name.surname+alias@domain.com)
    var emailFieldValue = emailField.value;
    var emailTip = document.getElementById('emailTip');
    if (Array.isArray(checks) === false) {
        checks = [];
    }
    if (emailFieldValue === null || emailFieldValue === '') {
        emailField.setAttribute('class', 'warning');
        emailTip.style.display = 'block';
        emailTip.innerHTML = 'Proszę wpisać adres e-mail';
        checks.push(false);
        return checks;
    } else if (reg.test(emailFieldValue)) {
        emailField.removeAttribute('class');
        emailTip.innerHTML = '';
        checks.push(true);
        return checks;
    } else {
        emailField.setAttribute('class', 'warning');
        emailTip.style.display = 'block';
        emailTip.innerHTML = 'Niepoprawny adres e-mail';
        checks.push(false);
        return checks;
    }
}

/**
 * This function counts the number of characters that have been inputted in the text field and displays that number to the user.
 */

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

/**
 * This function checks if the input from the text field passes the set validation.
 */

function checkTextField(checks) {
    var textFieldValue = textField.value;
    var textTip = document.getElementById('textTip');
    if (Array.isArray(checks) === false) {
        checks = [];
    }
    if (textFieldValue === null || textFieldValue === '' || textFieldValue.search(/[a-z]+/i) === -1) {
        textField.setAttribute('class', 'warning');
        textTip.style.display = 'block';
        textTip.innerHTML = 'Proszę wpisać wiadomość';
        checks.push(false);
        return checks;
    } else {
        textField.classList.remove('warning');
        textTip.style.display = 'none';
        checks.push(true);
        return checks;
    }
}

/**
 * This function clears the form.
 */

function clearField() {
    nameField.removeAttribute('class');
    emailField.removeAttribute('class');
    textField.removeAttribute('class');
    nameTip.innerHTML = '';
    emailTip.innerHTML = '';
    textTip.innerHTML = '';
}
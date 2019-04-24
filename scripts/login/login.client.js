// Login Elements
let loginEL = document.getElementsByClassName('login')[0];
let loginContainerEL = document.getElementsByClassName('login__container')[0];
let loginFormEL = document.getElementsByClassName('login__form')[0];
let usernameEL = document.getElementsByClassName('login__username-input')[0];
let passwordEL = document.getElementsByClassName('login__password-input')[0];
let loginButtonEl = document.getElementsByClassName('login__signin')[0];


// Register Elements
let loginRegContainerEL = document.getElementsByClassName('login__register-container')[0];
let loginRegFormEL = document.getElementsByClassName('login__register-form')[0];
let registerButtonEl = document.getElementsByClassName('login__register')[0];
let usernameRegEL = document.getElementsByClassName('login__username-input-register')[0];
let passwordRegEL = document.getElementsByClassName('login__password-input-register')[0];

// UI Elements
let loginSingupButtonEl = document.getElementsByClassName('go_to_signup')[0];
let loginRegButtonEl = document.getElementsByClassName('go_to_login')[0];


// Default
setTimeout(() => {
    loginEL.classList.remove('hide');
}, 300);

// Login Events
loginButtonEl.addEventListener('click', function(){
    loginButtonEl.blur();
    mp.trigger('loginInformationToServer', usernameEL.value, passwordEL.value);
}, false);

loginFormEL.addEventListener('submit', function(event){
    event.preventDefault();
    event.stopPropagation();

    loginButtonEl.blur();
    mp.trigger('loginInformationToServer', usernameEL.value, passwordEL.value);
}, false);

loginSingupButtonEl.addEventListener('click', function(){
    loginContainerEL.classList.add('hidden');
    loginRegContainerEL.classList.remove('hidden');
}, false);


// Register Events
registerButtonEl.addEventListener('click', function(){
    registerButtonEl.blur();
    mp.trigger('registerInformationToServer', usernameRegEL.value, passwordRegEL.value);
    loginRegContainerEL.classList.add('hidden');
    loginContainerEL.classList.remove('hidden');
}, false);

loginRegFormEL.addEventListener('submit', function(event){
    event.preventDefault();
    event.stopPropagation();

    loginRegFormEL.blur();
    mp.trigger('registerInformationToServer', usernameRegEL.value, passwordRegEL.value);
}, false);

loginRegButtonEl.addEventListener('click', function(){
    loginRegContainerEL.classList.add('hidden');
    loginContainerEL.classList.remove('hidden');
}, false);

function hideLogin(){
    loginEL.classList.add('hide');
}
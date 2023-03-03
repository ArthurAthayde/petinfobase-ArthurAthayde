export function toastSuccessfullLogin() {
    const toastContainer = document.querySelector('.toastSuccessfullLogin__container');

    toastContainer.classList.remove('hidden');
}

export function toastLoginError() {
    const toastContainer = document.querySelector('.toastLogin__container');

    toastContainer.classList.remove('hidden');
}

export function toastRegister() {
    const toastContainer = document.querySelector('.toastRegister__container');

    toastContainer.classList.remove('hidden');
}

export function toastRegisterError() {
    const toastContainer = document.querySelector('.toastRegisterError__container');

    toastContainer.classList.remove('hidden');
}

export function toastPosted() {
    const toastContainer = document.querySelector('.toastPosted__container');

    toastContainer.classList.remove('hidden');
}

export function toastDelete(){
    const toastContainer = document.querySelector('.toastDeleted__container');

    toastContainer.classList.remove('hidden');
}
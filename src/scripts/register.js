import { registerRequest } from "./requests.js";
import { toastRegister, toastRegisterError } from "./toast.js";


function authentication(){
    const token = localStorage.getItem('@petinfo:token')

    if(token){
        window.location.replace('./src/pages/home.html')
    }
}

function handleRegister() {
    const inputs = document.querySelectorAll('.register__input');
    const registerBtn = document.querySelector('.registerBtn');
    const registerBody = {};
    let count = 0;

    registerBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        inputs.forEach(input => {
            if (input.value === '') {
                count++
            }

            registerBody[input.name] = input.value;
        })

        if (count != 0) {
            const toastContainer = document.querySelector('.toastRegisterError__container');
            toastRegisterError()

            setTimeout(() => {
                toastContainer.classList.add('toast__fadeout')
            }, 4000)

            setTimeout(() => {
                toastContainer.classList.add('hidden')
            }, 5990)
        } else {
            const newUser = await registerRequest(registerBody);

            const toastContainer = document.querySelector('.toastRegister__container');
            toastRegister()

            setTimeout(() => {
                toastContainer.classList.add('toast__fadeout')
            }, 4000)

            setTimeout(() => {
                toastContainer.classList.add('hidden')
            }, 5990)

            setTimeout(() => {
                window.location.replace('../../index.html')
            }, 6500);
        }

    })

}

handleRegister()
authentication()
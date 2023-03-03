import { loginRequest, registerRequest } from "./requests.js";
import { toastLoginError, toastSuccessfullLogin } from "./toast.js";


function authentication(){
    const token = localStorage.getItem('@petinfo:token')

    if(token){
        window.location.replace('./src/pages/home.html')
    }
}

function handleLogin(){
    const inputs = document.querySelectorAll('.login__input');
    const loginBtn = document.querySelector('.submitLoginBtn');
    const loginBody = {};
    let count = 0;
    

    loginBtn.addEventListener('click', async(e) =>{
        e.preventDefault();

        inputs.forEach(input =>{
            if(input.value === ''){
                count++
            }

            loginBody[input.name] = input.value;
        })

        if(count != 0){
            const toastContainer = document.querySelector('.toastLogin__container');
            toastLoginError()

            setTimeout(()=>{
                toastContainer.classList.add('toast__fadeout')
            }, 4000)

            setTimeout(()=>{
                toastContainer.classList.add('hidden')
            }, 5990)

        }else if(count == 0){
            const token = await loginRequest(loginBody)
            
            const toastContainer = document.querySelector('.toastSuccessfullLogin__container');
            toastSuccessfullLogin()

            setTimeout(() => {
                toastContainer.classList.add('toast__fadeout')
            }, 4000)

            setTimeout(() => {
                toastContainer.classList.add('hidden')
            }, 5990)

            setTimeout(() => {
                window.location.replace('../../index.html')
            }, 6000);

            return token;
        }
    })
    
}
handleLogin();
authentication();
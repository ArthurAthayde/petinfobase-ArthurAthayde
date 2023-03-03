


function authentication(){
    const token = localStorage.getItem('@petinfo:token')

    if(!token){
        window.location.replace('../../index.html')
    }
}
authentication()
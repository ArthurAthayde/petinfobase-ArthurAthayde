import { toastDelete, toastLoginError, toastPosted } from "./toast.js";

const baseUrl = 'http://localhost:3333';
const token = localStorage.getItem('@petinfo:token')
const requestHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
}


export async function loginRequest(loginBody) {
    const token = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(loginBody)
    })
        .then(response => {
            if (response.ok) {
                const responseJson = response.json()
                    .then(({ token }) => {
                        localStorage.setItem('@petinfo:token', JSON.stringify(token));

                        return token;
                    })
                return responseJson;
            } else {
                const toastContainer = document.querySelector('.toastLogin__container');
                toastLoginError()

                setTimeout(() => {
                    toastContainer.classList.add('toast__fadeout')
                }, 4000)

                setTimeout(() => {
                    toastContainer.classList.add('hidden')
                }, 5990)
            }
        })

    return token;

}

export async function registerRequest(registerBody) {
    const newUser = await fetch(`${baseUrl}/users/create`, {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(registerBody)
    })
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                response.json().then(error => console.log(error))
            }
        })

    return newUser;
}

export async function getConnectedUser() {
    const user = await fetch(`${baseUrl}/users/profile`, {
        method: 'GET',
        headers: requestHeaders
    })
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                response.json().then(({ message }) => {
                    alert(message);
                })
            }
        })
    return user
}

export async function patchUser(userBody) {
    const attUser = await fetch(`${baseUrl}/users/profile`, {
        method: 'PATCH',
        headers: requestHeaders,
        body: JSON.stringify(userBody)
    })
        .then(response => {
            if (response.ok) {
                alert('Usuário atualizado com sucesso');
            } else {
                response.json().then(({ message }) => {
                    alert(message);
                })
            }
        })
    return attUser;
}

export async function deleteUser() {
    const userToDelete = await fetch(`${baseUrl}/users/profile`, {
        method: 'DELETE',
        headers: requestHeaders
    })
        .then(response => {
            if (response.ok) {
                alert('Usuário deletado com sucesso');
            } else {
                response.json().then(({ message }) => {
                    alert(message);
                })
            }
        })
    return userToDelete;
}

export async function createPost(postBody) {
    const newPost = await fetch(`${baseUrl}/posts/create`, {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(postBody)
    })
        .then((response => {
            if (response.ok) {
                const postJson = response.json().then((responseJson) => {
                    const toastContainer = document.querySelector('.toastPosted__container');
                    toastPosted()

                    setTimeout(() => {
                        toastContainer.classList.add('toast__fadeout')
                    }, 4000)

                    setTimeout(() => {
                        toastContainer.classList.add('hidden')
                    }, 5990)
                    return responseJson;
                })
                return postJson;
            } else {
                response.json().then(({ message }) => {
                    alert(message);
                })
            }
        }))

    return newPost
}

export async function readAllPosts() {
    const allPosts = await fetch(`${baseUrl}/posts`, {
        method: 'GET',
        headers: requestHeaders
    })
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                response.json().then(({ message }) => {
                    alert(message);
                })
            }
        })
    return allPosts
}


export async function patchPostById(postId, postBody) {
    const post = await fetch(`${baseUrl}/posts/${postId}`, {
        method: 'PATCH',
        headers: requestHeaders,
        body: JSON.stringify(postBody)
    })
        .then(response => {
            if (response.ok) {
                alert('Seu post foi atualizado com sucesso');

                return response.json();
            } else {
                response.json().then(({ message }) => {
                    alert(message);
                })
            }
        })
    return post;
}


export async function deletePostById(postId) {
    const post = await fetch(`${baseUrl}/posts/${postId}`, {
        method: 'DELETE',
        headers: requestHeaders
    })
        .then((response => {
            if (response.ok) {
                const postJson = response.json().then((responseJson) => {
                    const toastContainer = document.querySelector('.toastDeleted__container');
                    toastDelete()

                    setTimeout(() => {
                        toastContainer.classList.add('toast__fadeout')
                    }, 4000)

                    setTimeout(() => {
                        toastContainer.classList.add('hidden')
                    }, 5990)
                    return responseJson;
                })
                return postJson;
            } else {
                response.json().then(({ message }) => {
                    alert(message);
                })
            }
        }))

    return post;

}
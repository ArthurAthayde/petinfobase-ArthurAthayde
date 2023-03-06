import { createPost, deletePostById } from "./requests.js";

export async function renderAllPosts(array) {
    const postsList = document.querySelector('.posts__container');

    postsList.innerHTML = '';

    array.forEach(post => {
        const card = createCard(post);

        postsList.appendChild(card);
    });
}

function createCard(post) {
    const postContainer = document.createElement('li');
    const postHeader = document.createElement('div');
    const avatar = document.createElement('img');
    const username = document.createElement('p');
    const date = document.createElement('span');
    const editBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');
    const title = document.createElement('h3');
    const abstract = document.createElement('p');
    const openModal = document.createElement('button');


    postContainer.classList.add('post__container');
    postContainer.dataset.postId = post.id;

    postHeader.classList.add('post__header');

    avatar.classList.add('post__avatar');
    avatar.src = post.user.avatar;

    username.classList.add('post__username');
    username.innerText = post.user.username;

    date.classList.add('post__data');
    const convertDate = new Date(post.createdAt).toDateString().split(' ');
    date.innerText = `${convertDate[2]} ${convertDate[1]} ${convertDate[3]}`;

    editBtn.classList.add('editPostBtn');
    editBtn.innerText = 'Editar';
    editBtn.dataset.postId = post.id;

    deleteBtn.classList.add('deletePostBtn');
    deleteBtn.innerText = 'Excluir';
    deleteBtn.dataset.postId = post.id;

    title.classList.add('post__title');
    title.innerText = post.title;
    title.dataset.postId = post.id;

    abstract.classList.add('post__abstract');
    abstract.innerText = `${post.content.substring(0, 145)}...`;
    abstract.dataset.postId = post.id;

    openModal.classList.add('openModal');
    openModal.innerText = 'Acessar publicação';
    openModal.dataset.postId = post.id;

    openModal.addEventListener('click', () => {
        const modalController = document.querySelector('.modal__controller--post');

        modalController.innerHTML = '';

        const modalContainer = document.createElement('div');
        modalContainer.classList.add('modal__container');

        modalContainer.innerHTML = `
        
        <div class="modal__header">
            <img class="modal__avatar" src="${post.user.avatar}" alt="Foto de avatar">
            <p class="modal__username">${post.user.username}</p>
            <span class="modal__data">${convertDate[2]} ${convertDate[1]} ${convertDate[3]}</span>
            <button class="closeModalBtn">X</button>
        </div>
        <h3 class="modal__title">${post.title}</h3>
        <p class="modal__abstract">${post.content}</p>
       
        `;

        modalController.appendChild(modalContainer);
        modalController.showModal();

        const closeBtn = document.querySelector('.closeModalBtn');
        closeBtn.addEventListener('click', () => {
            modalController.close();
        })
    })

    postHeader.append(avatar, username, date, editBtn, deleteBtn);
    postContainer.append(postHeader, title, abstract, openModal);

    return postContainer;
}


function newPost() {
    const inputs = document.querySelectorAll('.newPostInput');
    const newPostBtn = document.querySelector('.newPostBtn');
    const newPostModal = document.querySelector('.modal__controller--newPost');
    const postBody = {};
    let count = 0;

    newPostBtn.addEventListener('click', (e) => {
        e.preventDefault();
        newPostModal.showModal();
    })

    const submitBtn = document.querySelector('.newPost__submitBtn');

    submitBtn.addEventListener('click', async (e) => {
        e.preventDefault;
        inputs.forEach(input => {
            if (input.value === '') {
                count++
            }

            postBody[input.name] = input.value;
        })

        if (count != 0) {
            alert('Por favor, preencha todos os campos necessários')
        } else {
            const newPostReq = await createPost(postBody);
            newPostModal.close();
            location.reload();

        }
    })
}

function closeNewPost() {
    const buttons = document.querySelectorAll('.closeModal');
    const newPostModal = document.querySelector('.modal__controller--newPost');


    buttons.forEach(button => {
        button.addEventListener('click', () => {
            newPostModal.close();
        })
    })
}

export function renderHeader() {
    const user = JSON.parse(localStorage.getItem('@petinfo:user'));
    const header = document.querySelector('header');

    const headerContainer = `
    <h1>Petinfo</h1>
    <div class="newPost__container">
        <button class="newPostBtn">Criar publicação</button>
        <img src="${user.avatar}" alt="Avatar do usuário">
        <button class="logoutBtn hidden">Logout</button>
    </div>
    `;

    header.append(headerContainer);

    const logoutBtn = document.querySelector('.logoutBtn');
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location.replace('../../index.html')
    })

}

newPost();
closeNewPost();
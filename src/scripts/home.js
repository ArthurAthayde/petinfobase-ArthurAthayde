import { renderAllPosts } from "./render.js"
import { readAllPosts } from "./requests.js"



function authentication() {
    const token = localStorage.getItem('@petinfo:token')

    if (!token) {
        window.location.replace('../../index.html')
    }
}

async function renderHome() {
    const allPosts = await readAllPosts()
    renderAllPosts(allPosts)
}

function deletePost() {
    const buttons = document.querySelectorAll('.deletePostBtn');
    const modal = document.querySelector('.modal__controller--delete')
   
    buttons.forEach(button => {
        button.addEventListener('click', async (e) => {
            modal.showModal();
            await deletePostById(e.target.dataset.postId);
            location.reload();

        })
    })
}


authentication();
renderHome();
deletePost();

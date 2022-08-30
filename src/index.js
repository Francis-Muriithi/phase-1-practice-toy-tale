let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

getToys()

function getToys() {
  return fetch(toysURL).then(resp => resp.json()).then(toys => toys.forEach(toy => renderToy(toy)))
}

function renderToy(toy) {
  let cardDiv = document.createElement('div')
  cardDiv.className = 'card'
  let toyName = document.createElement('h2')
  toyName.innerText = toy.name
  let toyImg = document.createElement('img')
  toyImg.src = toy.image
  toyImg.className = 'toy-avatar'
  let likes = document.createElement('p')
  likes.innerText = `${toy.likes} Likes`
  let likeBtn = document.createElement('button')
  likeBtn.className = 'like-btn'
  likeBtn.innerText = 'Like'
  likeBtn.id = toy.id
  likeBtn.addEventListener('click', e => like(e))
  cardDiv.append(toyName, toyImg, likes, likeBtn)
  toyCollectionDiv.appendChild(cardDiv)
}

function like(e) {
  e.preventDefault()

  let likes = parseInt(e.target.previousElementSibling.innerText)
  let liked = likes + 1
  let toyId = e.target.id
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({likes: liked})
  })
  .then(resp => resp.json())
  .then(e.target.previousElementSibling.innerText = `${liked} likes`)
}

addBtn.addEventListener('click', () => {
  addToy = !addToy
  if (addToy) {
  toyForm.style.display = 'block'
  toyForm.addEventListener('submit', event => {
      event.preventDefault()
      if (event.target.name.value === '') {
        document.querySelector('.add-toy-form').reset()
        alert("a toy needs a name and an image!")
      } else {
        createToy(event.target)
        document.querySelector('.add-toy-form').reset() 
        toyForm.style.display = 'none'
      }
    })
  } else {
    toyForm.style.display = 'none'
  }
}) 

let toysURL= 'http://localhost:3000/toys'
function createToy(toyInfo) {
  fetch(toysURL, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify({name: toyInfo.name.value, image: toyInfo.image.value, likes: "0"})
  })
  .then(resp => resp.json())
  .then(newToyInfo => {
    renderToy(newToyInfo)
  })
}

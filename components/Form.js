import PostsList from "./PostsList.js";
import CustomError from "./Error.js";
import SuccessModalContent from './SuccessModalContent.js';
import {formValidation} from '../utilities.js';

const allPostsURL = 'https://jsonplaceholder.typicode.com/posts';

class Form {

  constructor () {
    this.state = {
      userId: '',
      title: '',
      body: ''
    };

    this.render();
  }

  addEventListeners() {
    const form = document.querySelector('.form');
    const modalAddButton = document.querySelector('.modalAddButton');
    const formError = document.querySelector('.formError');

    modalAddButton.addEventListener("click", (e) => {
      e.preventDefault();
      formError.innerText = '';

      const elements = Array.from(form.elements);

      const newPost = elements.reduce((acc, el) => {
        if (el.name) {
          acc[el.name] = el.value;
        }
 
        return acc;
      }, {});


      const isWithErrors = formValidation(newPost);

      if(!isWithErrors) {
        this.state = {
          userId: '',
          title: '',
          body: ''
        };

        this.postData(allPostsURL, newPost);

      } else {
        formError.innerText = 'All fields should be filled in.';
      }

    });
  }

  onPostSuccess () {
    const modal = document.querySelector('.modalOverlay');
    modal.classList.remove("showModal");

    new PostsList();
  }

  async postData (URL, post) {
    try {

      const response = await fetch(URL, {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })

      const data = await response.json();

      if (data.id) {
        const successMessage = "Post was successfully created."
        const successModalContent = new SuccessModalContent(successMessage, this.onPostSuccess);

        const formContainer = document.querySelector('.formContainer');

        formContainer.innerHTML = successModalContent.render();

        successModalContent.addEventListeners();

      } else {
        throw new Error('Post was not created. Try again later');
      }

    } catch (e) {
      console.log(e.message);

      const addPostError = document.querySelector('.formError');
      const error = new CustomError(e.message);

      addPostError.innerHTML = error.render();
    }
  };

  render () {
    const {userId, title, body} = this.state;

    return `<form class="form">
              <label for="userId">*User id: </label>
              <input type='number' id="userId" name="userId" value=${userId}></input>
              <label for="title">*Title: </label>
              <input type='text' id="title" name="title" value=${title}></input>
              <label for="body">*Post description: </label>
              <textarea type='text' id="body" name="body" value=${body}></textarea>
              <p class="formError"></p>
              <button class="button modalAddButton">Add</button>
            </form>`
  };

};

export default Form;

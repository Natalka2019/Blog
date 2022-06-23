import PostsList from "./PostsList.js";
import Form from "./Form.js";

class App {
  
  constructor() {
    this.render();
  }

  addEventListeners() {
    const input = document.querySelector('.actions__input');
    const addButton = document.querySelector('.addButton');
    const modal = document.querySelector('.modalOverlay');
    const modalCloseButton = document.querySelector('.modalCloseButton');
    const modalContent = document.querySelector('.modalContent');
    const formContainer = document.querySelector('.formContainer');

    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.createFilteredPostsList(input.value);
      }
    });

    addButton.addEventListener("click", () => {
      modal.classList.add("showModal");
      
      const form = new Form();
      formContainer.innerHTML = form.render();
      form.addEventListeners();
    });

    modalCloseButton.addEventListener("click", () => {
      modal.classList.remove("showModal");
    });

    modal.addEventListener("click", () => {
      modal.classList.remove("showModal");
    });

    modalContent.addEventListener("click", (e) => {
      e.stopPropagation();
    });

  };

  render() {
    new PostsList();
    this.addEventListeners();

  };
  
};

export default App;
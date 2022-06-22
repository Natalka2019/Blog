import PostsList from "./PostsList.js";
import {Error} from "./Error.js";
import {mockPosts} from '../mockPosts.js';

const allPostsURL = 'https://jsonplaceholder.typicode.com/posts';
const filteredPostsURL = 'https://jsonplaceholder.typicode.com/posts?userId=';

//const allPostsURL = '#';

class App {

  constructor() {
    this.state = {
      allPosts: mockPosts
    };

    this.render();
  }

  async fetchData (URL) {
    try {
      const response = await fetch(URL);
      const data = await response.json();

      this.state.allPosts = [...data]

    } catch (e) {
      console.log(e);

      const error = new Error('Oooops! Something went wrong. Please, try again later.');

      const postsList = document.querySelector('.postsList');

      postsList.innerHTML = error.render();
    }
  };

  async createAllPostsList () {
    await this.fetchData(allPostsURL);
    new PostsList(this.state.allPosts);
  };

  async createFilteredPostsList (userId) {
    await this.fetchData(`${filteredPostsURL}${userId}`);
    new PostsList(this.state.allPosts);
  };

  addEventListeners() {
    const input = document.querySelector('.actions__input');
    const filterButton = document.querySelector('.filterButton');
    const showAllButton = document.querySelector('.showAllButton');
    const addButton = document.querySelector('.addButton');

    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.createFilteredPostsList(input.value);
      }
    });

    filterButton.addEventListener("click", () => {

      this.createFilteredPostsList(input.value);

    });

    showAllButton.addEventListener("click", () => {

      this.createAllPostsList();

    });

  };

  render() {
    this.createAllPostsList();
    this.addEventListeners();

  };
  
};

export default App;
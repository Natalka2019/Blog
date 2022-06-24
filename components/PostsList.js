import Post from "./Post.js";
import CustomError from "./Error.js";

const allPostsURL = 'https://jsonplaceholder.typicode.com/posts';
const filteredPostsURL = 'https://jsonplaceholder.typicode.com/posts?userId=';

class PostsList {

  constructor() {
    this.state = {
      posts: [],
      error: false
    };

    this.postsList = document.querySelector('.postsList');
    this.filterButton = document.querySelector('.filterButton');
    this.showAllButton = document.querySelector('.showAllButton');
    this.input = document.querySelector('.actions__input');

    this.createAllPostsList();

    this.addEventListeners();
  }

  async fetchData (URL) {
    try {
      const response = await fetch(URL);
      const data = await response.json();

      this.state.posts = [...data]

    } catch (e) {
      console.log(e);

      this.state.error = true;

      const error = new CustomError('Oooops! Something went wrong. Please, try again later.');

      this.postsList.innerHTML = error.render();
    }
  };

  async createAllPostsList () {
    this.state.error = false;
    await this.fetchData(allPostsURL);
    this.render();
  };

  async createFilteredPostsList (userId) {
    this.state.error = false;
    await this.fetchData(`${filteredPostsURL}${userId}`);
    this.render();
  };

   addEventListeners () {
    this.input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.createFilteredPostsList(this.input.value);
      }
    });

    this.filterButton.addEventListener("click", () => {
      this.createFilteredPostsList(this.input.value);
    });

    this.showAllButton.addEventListener("click", () => {
      this.input.value = '';
      this.createAllPostsList();
    });
   }

  render() {

    const {error, posts} = this.state;

    if(!error && posts.length > 0) {
      const allPosts = this.state.posts.map(post => {
        const newPost = new Post(post);
              
        return newPost.render();
  
      }).join('');
        
      this.postsList.innerHTML = allPosts;
    }

  };
  
};

export default PostsList;
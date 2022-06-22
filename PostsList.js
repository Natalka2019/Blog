import {Post} from "./Post.js";
import {Error} from "./Error.js";

class PostsList {

  constructor() {
    this.state = {
      allPosts: []
    };

    this.render();
  }

  render() {

      const postsList = document.querySelector('.postsList');

      const createPostsList = async () => {
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/posts');
          const data = await response.json();
  
          this.state.allPosts = [...data]
  
          const allPosts = this.state.allPosts.map(post => {
            const newPost = new Post(post);
            
            return newPost.render();
          }).join('');
      
          postsList.innerHTML = allPosts;
        } catch (e) {
          console.log(e);

          const error = new Error('Oooops! Something went wrong. Please, try again later.');

          postsList.innerHTML = error.render();
        }
      };

      createPostsList ();

  };
  
};

export default PostsList;
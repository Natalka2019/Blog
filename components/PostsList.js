import {Post} from "./Post.js";

class PostsList {

  constructor(posts) {
    this.state = {
      posts
    };

    this.render();
  }

  render() {

    const postsList = document.querySelector('.postsList');

    const allPosts = this.state.posts.map(post => {
      const newPost = new Post(post);
            
      return newPost.render();

    }).join('');
      
    postsList.innerHTML = allPosts;

  };
  
};

export default PostsList;
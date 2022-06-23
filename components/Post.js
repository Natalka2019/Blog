class Post {

  constructor ({userId, id, title, body}) {
    this.state = {
      userId,
      id,
      title,
      body
    }
  }

  render () {
    const {userId, id, title, body} = this.state;
    
    return `<li class="post" id=${id}>
              <p class="post__userId">User:${userId}</p>
              <h4 class="post__title">${title}</h4>
              <p class="post__id">Post id:${id}</p>
              <p class="post__body">${body}</p>
            </li>`

  };

};

export default Post;

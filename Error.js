export class Error {

  constructor (error) {
    this.state = {
      error
    }
  }

  render () {
    const {error} = this.state;
    
    return `<p class="error">${error}</p>`

  };

};

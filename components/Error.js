class CustomError {

  constructor (error) {
    this.state = {
      error
    }
  }

  render () {

    return `<p class="error">${this.state.error}</p>`

  };

};

export default CustomError;

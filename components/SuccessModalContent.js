class SuccessModalContent {

  constructor (message = '', onClick) {
    this.state = {
      message,
      onClick
    };

  }

  addEventListeners() {
    const successButton = document.querySelector('.successButton');
    successButton.addEventListener("click", this.state.onClick);

  }

  render () {

    return `<div class="successMessageContainer">
              <p class="successMessage">${this.state.message}</p>
              <button class="successButton">Ok</button>
            </div>`;
  };

};

export default SuccessModalContent;

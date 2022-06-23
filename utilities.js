export function formValidation (post) {

  let isWithErrors;

  for (let key in post) {
    if (post[key].trim() === '') {
      isWithErrors = true;
    } else {
      isWithErrors = false;
    }
  }

  return isWithErrors;
}
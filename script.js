const form = document.querySelector('.sign-up-form')
const names = document.querySelectorAll('.names');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password'); 
const confirmPW = document.getElementById('confirm-pw');
const passwords = Array.from(document.querySelectorAll('input[type="password"]'));
const pwMessage = document.querySelector('.pw-message');
const fieldRequired = 'This field is required'

const letter = document.getElementById("letter");
const capital = document.getElementById("capital");
const number = document.getElementById("number");
const length = document.getElementById("length");

for (let i = 0; i < names.length; i++) {
  names[i].onblur = () => {
    let val = names[i].value.trim();
    let result = validateName(val);
    result === true ? setSuccess(names[i]) : setError(names[i], result);
  }
}

email.onblur = () => {
  let val = email.value.trim();
  let result = validateEmail(val);
  result === true ? setSuccess(email) : setError(email, result);
}

email.onkeydown = () => {
  let inputType = email.parentElement.parentElement;

  if (inputType.classList.contains('error')) {
    let val = email.value.trim();
    let result = validateEmail(val);
    result === true ? setSuccess(email) : setError(email, result);
  }
}

phone.onblur = () => {
  let val = phone.value.trim();
  let result = validatePhone(val);
  if (!val) return;
  result === true ? setSuccess(phone) : setError(phone, result);
}

phone.onkeyup = () => {
  let inputType = phone.parentElement.parentElement;
  if (!inputType.classList.contains('error')) return;

  let val = phone.value.trim();
  let result = validatePhone(val);
  if (val.length < 1) return inputType.classList.remove('error');

  result === true ? setSuccess(phone) : setError(phone, result);
}

password.onblur = () => {
  const val = password.value
  pwMessage.style.visibility = 'hidden';
  if (passwordsEmpty()) {
    resetClass(password)
    resetClass(confirmPW)
    return
  }
  
  if (validatePW(val) && matchingPW()) setSuccess(password)
}

password.onfocus = () => {
  pwMessage.style.visibility = 'visible';
}

password.onkeyup = () => {
  const val = password.value
  const matchResult = matchingPW()
  validateLowerCase(val);
  validateNumber(val);
  validateUpperCase(val);
  validateLength(val);

  if (passwordsEmpty()) {
    resetClass(password)
    resetClass(confirmPW)
    return
  }

  if (matchResult !== true) {
    setError(confirmPW, matchResult);
    setError(password, matchResult);
    return
  }

  if (validatePW(val) && matchResult) {
    setSuccess(confirmPW);
    setSuccess(password);
  } else {
    setError(confirmPW, 'Password requirements not ment');
    setError(password, matchResult);
  }
}

confirmPW.onkeyup = () => {
  const matchResult = matchingPW()
  if (passwordsEmpty()) {
    resetClass(confirmPW);
  } else if (matchResult === true && validatePW(confirmPW.value)) {
    setSuccess(confirmPW);
  } else if (matchResult === true && !validatePW(confirmPW.value)) {
    setError(confirmPW, 'Password Requirements not met')
  } else {
    setError(confirmPW, matchResult);
  }
};

function validateName(value) {
  if (!value) return fieldRequired;
  return true;
}

function validateEmail(value) {
  if (!value) return fieldRequired;
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!regex.test(value)) return "Requires a '@' and a ' . ' subdomain"

  return true;
}

function validatePhone(value) {
  const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  if (!regex.test(value)) return 'Requires area code and 7 digits (123) 555-1234';

  return true
}

function passwordsEmpty() {
  return passwords.every( pass => pass.value === '' )
}

function matchingPW() {
  if (passwords.every( pass => pass.value === passwords[0].value )) return true;
  return 'Passwords do not match';
}

function validateLowerCase(value) {
  const lowerCaseLetters = /[a-z]/g;
  const letClass = letter.classList;
  value.match(lowerCaseLetters) ? letClass.add("valid") : letClass.remove("valid")
}

function validateUpperCase(value) {
  const upperCaseLetters = /[A-Z]/g;
  const capClass = capital.classList;
  value.match(upperCaseLetters) ? capClass.add("valid") : capClass.remove("valid")
}

function validateNumber(value) {
  const numbers = /[0-9]/g;
  const numClass = number.classList;
  value.match(numbers) ? numClass.add("valid") : numClass.remove("valid");
}

function validateLength(value) {
  const lenClass = length.classList;
  value.length >= 8 ? lenClass.add("valid") : lenClass.remove("valid");
}

function validatePW(value) {
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  return regex.test(value)
}

function setError(input, message) {
  const inputType = input.parentElement.parentElement;
  const small = inputType.querySelector('small');  
  inputType.className = 'input-field error';
  if (input === password) {
    small.style.display = 'none'
    inputType.style.margin = '0 0 10px 0'
    return;
  }
  small.innerText = message;
}

function setSuccess(input) {
  const inputType = input.parentElement.parentElement;
  inputType.className = 'input-field success';
}

function resetClass(input) {
  const inputType = input.parentElement.parentElement;
  inputType.className = 'input-field';
}

function onSubmit(values) {
  console.log(values);
}
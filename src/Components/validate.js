export function currentDateString() {
  const date = new Date();
  return (
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1 + "").padStart(2, "0") +
    "-" +
    (date.getDate() + "").padStart(2, "0")
  );
}

export function emailValidation(email) {
  if (email === "") return false;
  const regex_pattern = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

  if (regex_pattern.test(email)) {
    return true;
  }
  return false;
}

export function nameValidation(name) {
  if (name === "") return false;
  const fnameRegex = /^[A-Za-z]+$/;
  if (fnameRegex.test(name) == false) {
    return false;
  }
  return true;
}

export function mobileValidation(mobileNumber) {
  if (mobileNumber === "") return false;

  const mobilenumRegex = /[0-9]/;
  if (mobileNumber.length == 10 && mobilenumRegex.test(mobileNumber)) {
    return true;
  }
  return false;
}

export function addressValidation(address) {
  if (address === "") return false;

  if (address.length > 50) return false;

  return true;
}

export function dateValidation(date) {
  if (date) {
    return true;
  }
  return false;
}

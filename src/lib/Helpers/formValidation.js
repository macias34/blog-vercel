export function isEmpty(field) {
  field = field.toString();
  if (field.trim().length <= 0) {
    return true;
  }

  return false;
}

export function isFormEmpty(fieldArr) {
  let isFormBlank = false;
  const arrLength = fieldArr.length - 1;

  for (let i = 0; i <= arrLength; i++) {
    isFormBlank = isEmpty(fieldArr[i]);
    if (isFormBlank) return true;
  }
  return false;
}

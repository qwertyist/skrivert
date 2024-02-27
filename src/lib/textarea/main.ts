/* 
  const insertText = (textarea, text) => {
    const position = textarea.selectionStart;
    const before = textarea.value.substring(0, position);
    const after = textarea.value.substring(position, textarea.value.length);
    textarea.value = before + text + after;
    textarea.selectionStart = textarea.selectionEnd = position + text.length;
  };
*/
export const insertText = (textarea, text) => {
  const start = textarea.selectionStart;
  const end = textarea.selectionStart + text.length;
  textarea.setRangeText(text, start, end, "end");
};
export const insertExpandedPhrase = (textarea, expander, len, text) => {
  const start = textarea.selectionStart - len;
  const end = textarea.selectionStart;
  textarea.setRangeText(text.concat(expander), start, end, "end");
};

const findIndexOfCurrentWord = (textarea) => {
  const currentValue = textarea.value;
  const cursorPos = textarea.selectionStart;

  // Iterate backwards through characters until we find a space or newline character
  let startIndex = cursorPos - 1;
  while (
    startIndex >= 0 &&
    /\p{Letter}|\p{Number}/u.test(currentValue[startIndex])
  ) {
    console.log(currentValue[startIndex]);
    startIndex--;
  }
  return startIndex;
};

export const getCurrentWord = (textarea) => {
  const currentValue = textarea.value;
  const cursorPos = textarea.selectionStart;
  const startIndex = findIndexOfCurrentWord(textarea);
  return currentValue.substring(startIndex + 1, cursorPos);
};

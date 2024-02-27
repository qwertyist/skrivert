export const insertExpandedPhrase = (textarea, expander, len, text) => {
  const start = textarea.selectionStart - len;
  const end = textarea.selectionStart;
  textarea.setRangeText(text.concat(expander), start, end, "end");
};
const findIndexOfCurrentWord = (textarea) => {
  // Get current value and cursor position
  const currentValue = textarea.value;
  const cursorPos = textarea.selectionStart;

  // Iterate backwards through characters until we find a space or newline character
  let startIndex = cursorPos - 1;
  while (startIndex >= 0 && !/\s/.test(currentValue[startIndex])) {
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

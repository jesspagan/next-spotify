export const capitalize = (text: string) => {
  const lowerCaseText = text.toLowerCase();
  return lowerCaseText[0].toUpperCase() + lowerCaseText.substr(1);
};

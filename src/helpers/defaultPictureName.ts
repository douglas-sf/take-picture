export function getDefaultPictureName() {
  const now = new Date();
  const defaultName = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}-Picture`;

  return defaultName;
}

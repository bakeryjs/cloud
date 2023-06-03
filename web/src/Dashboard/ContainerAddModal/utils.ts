export const getRandomPort = (): number => {
  const min = Math.ceil(3000);
  const max = Math.floor(12000);
  return Math.floor(Math.random() * (max - min) + min);
};

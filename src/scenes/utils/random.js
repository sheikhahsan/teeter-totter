/**
 * returns a random number between 1 to end
 * end inclusive
 */
export const getRandomNumber = end => {
  return Math.ceil(Math.random() * end)
}

export default {
  getRandomNumber
}
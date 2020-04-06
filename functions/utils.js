/**
 * @notice Returns unix timestamp of `numberOfDays` ago
 * @param {Number} numberOfDays how many days ago
 */
function getPastDate(numberOfDays) {
  const dateOffset = (24 * 60 * 60 * 1000) * numberOfDays;
  const date = new Date();
  date.setTime(date.getTime() - dateOffset);
  return Math.floor(date.getTime() / 1000);
}

module.exports = {
  getPastDate,
};

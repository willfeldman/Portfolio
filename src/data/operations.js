// gets the item in list by id
function getById(id, list) {
  return list.find((item) => item.id === id);
}

// returns the oppsite id than asked from list
// (ie. with 6 items: id 0 returns id 5, id 1 returns id 4, etc. )
function convertIdToComplement(id, list) {
  var numOfItems = Object.keys(list).length;
  return Math.abs(numOfItems - id - 1);
}

export { getById, convertIdToComplement };

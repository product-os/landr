module.exports = (val1, val2, block) => {
  if (val1 % val2 === 0) {
    return block.fn(this);
  } else {
    return block.inverse(this);
  }
};

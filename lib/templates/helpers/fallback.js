module.exports = (target, fallback) => {
  if (target)
    return target;
  else
    return fallback;
};

module.exports = (name, value, context, fallback) => {
  this[name] = value || fallback;
};

module.exports = (repoDir, landrDir, gitInfo) => {
  return JSON.stringify({
    name: gitInfo.getName(),
  });
};

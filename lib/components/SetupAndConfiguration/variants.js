export const name = 'SetupAndConfiguration'

export const variants = (metadata) => {
  const combinations = []

  if (metadata.data.setup) {
    combinations.push({
      setup: metadata.data.setup,
      deployWithBalenaUrl: metadata.data.deployWithBalenaUrl
        ? metadata.data.deployWithBalenaUrl.replace('.git', '')
        : null
    })
  }

  return combinations
}

export default {
  name,
  variants
}

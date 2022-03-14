export const name = 'HardwareRequired'

export const variants = (metadata) => {
  const combinations = []

  if (metadata.data.hardwareRequired) {
    combinations.push({
      hardwareRequired: metadata.data.hardwareRequired
    })
  }

  return combinations
}

export default {
  name,
  variants
}

module.exports = (val) => {
  if (
    val.match(/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm)
  ) {
    let arr = val.split('/')
    return `<a href="${val}">${arr[arr.length - 1]}</a>`
  } else {
    return val
  }
}

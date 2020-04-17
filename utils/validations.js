const required = (propType) => {
  return v => (v && v.length > 0) || `必須項目です`
}

export default {
  required
}

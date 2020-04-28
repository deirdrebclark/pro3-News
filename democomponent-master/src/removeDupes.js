export const removeDupes = (arr, prop) => {
  const set = new Set(arr.map(a => a[prop]))
  return Array.from(set)
}

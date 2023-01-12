// remove duplicate values in a array

export function removeDuplicates(arr: any[]) {
  return arr.filter((item: any, index: any) => arr.indexOf(item) === index);
}

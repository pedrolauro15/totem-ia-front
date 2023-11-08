export function dateIso(input: string) {
  if(!input || input.length < 10) {
    return input
  }
  return input.split('/').reverse().join('-')
}
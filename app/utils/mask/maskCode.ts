export function maskCode(code: string): string {
  if (!code) {
    return ''
  }
  if (code.length !== 8 || !/^\d+$/.test(code)) {
    throw new Error('O código deve ter exatamente 8 dígitos numéricos.')
  }

  const maskedCode = `${code.substring(0, 4)}-${code.substring(4)}`
  return maskedCode
}

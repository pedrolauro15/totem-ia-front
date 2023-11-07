export interface ApiRecognitionResponse {
  client: {
    cpf: string
    birth_date: string 
    name: string 

  }
  personId: string
  code: 'F' | 'NF'
  message: string
}
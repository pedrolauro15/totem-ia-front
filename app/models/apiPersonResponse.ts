export interface ApiPersonResponse {
  pendingScheduling: {
    id: string;
    time: string;
    specialities: { name: string }
    schedules: {
      date: string;
      professionals: {
        persons: {
          name: string
        }
      }
    }
  }
  person: {
    cpf: string
    name: string
    birth_date: string
  }
  clientBase64Image: string
}
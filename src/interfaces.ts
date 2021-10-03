interface ResponseMessage {
  status: "Success" | "Failed",
  data: any
}

export const constructResponse = (status: "Success" | "Failed", data?: any): ResponseMessage => ({status, data});
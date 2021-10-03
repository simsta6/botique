interface ResponseMessage {
  status: "Success" | "Failed",
  data: unknown
}

export const constructResponse = (status: "Success" | "Failed", data?: unknown): ResponseMessage => ({status, data});
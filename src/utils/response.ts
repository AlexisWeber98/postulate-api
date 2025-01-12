export default function serverResponse(statusResponse: string, result: object) {
  return {
    statusResponse,
    result,
  };
}

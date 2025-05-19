export default function serverResponse(
  statusResponse: string,
  result: object | string,
) {
  return {
    statusResponse,
    result,
  };
}

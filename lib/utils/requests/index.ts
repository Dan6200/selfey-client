export default function (
  url: string,
  action: string,
  body: any,
  onSuccess: (result: any) => void,
  onError: (error: any) => void
) {
  fetch(url, {
    method: action,
    body,
  })
    .then((response) => {
      if (!response.ok) return response.json();
    })
    .then((result) => {
      onSuccess(result);
    })
    .catch((error) => {
      onError(error);
    });
}

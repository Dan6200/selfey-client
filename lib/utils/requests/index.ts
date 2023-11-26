import axios from "axios";

export default async function (
  url: string,
  action: string,
  body: any,
  onSuccess: (result: any) => void,
  onError: (error: any) => void
) {
  try {
    const response = await axios({
      method: action,
      url: url,
      data: body,
    });
    onSuccess(response.data);
  } catch (error) {
    onError(error);
  }
}

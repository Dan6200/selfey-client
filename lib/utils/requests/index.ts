import axios from "axios";

export default async function (url: string, action: string, body: any) {
  try {
    const response = await axios({
      method: action,
      url: url,
      data: body,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
}

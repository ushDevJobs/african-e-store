export function catchError(error: any) {
  // If we have a response error
  if (error.response) {
    // Log the error
    console.error("Response Error:", error.response.data);
  }
  // Otherwise, if we could not reach the server...
  else if (error.request) {
    // Log the error
    // console.log("Request Error:", error.request);
  }
  // Otherwise... some error occurred in the build up of the request
  else {
    // Log the error
    console.error("Request Build Up Error:", error.message);
  }
}
interface responseData {
  errors: { message: string }[];
  errorCode: number;
  status: boolean;
  message: string;
}
export const createCustomErrorMessages = (response: responseData) => {
  if (!response) {
    return "Unable to complete request";
  }

  let message;
  const { errorCode } = response;

  switch (errorCode) {
    case 1000:
      message = "Invalid credentials";
      break;
    case 1001:
      message = "User not found";
      break;
    case 1002:
      message = "User already exist";
      break;
    case 1004:
      message = "Invalid email address";
      break;
    case 2000:
      message = "Unable to process request";
      break;
    case 2001:
      message = "Unauthorized";
      break;
    case 2002:
      message = "Invalid data. ";
      if (response.errors && response.errors.length > 0) {
        message += response.errors[0].message;
      }
      break;
    case 2003:
      message = "Not Authenticated";
      break;
    case 2004:
      message = "Not Found";
      break;
    case 5000:
      message = "Something went wrong";
      break;
    case 5001:
      message = "Unable to send mail";
      break;
    default:
      message = response.message;
  }
  return message;
};

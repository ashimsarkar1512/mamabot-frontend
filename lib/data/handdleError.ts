import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { toast } from "sonner";




interface ErrorResponse {
  message?: string;
}

export const handleError = (
  err: unknown,
  defaultMessage = "Something went wrong"
) => {
  if ((err as FetchBaseQueryError)?.status) {
    // RTK Query error
    const fetchError = err as FetchBaseQueryError;
    let message = defaultMessage;

    if (fetchError.data && typeof fetchError.data === "object") {
      const data = fetchError.data as ErrorResponse;
      if (data.message) message = data.message;
    }

    toast.error(message);
    console.error("RTK Query Error:", fetchError);
  } else if (err instanceof Error) {
    // Regular JS error
    toast.error(err.message || defaultMessage);
    console.error("Error:", err);
  } else {
    // Unknown error
    toast.error(defaultMessage);
    console.error("Unknown error:", err);
  }
};

export const handleSuccess = (message: string) => {
  toast.success(message); // green toast
  console.log("Success:", message);
};
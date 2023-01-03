import { createClient } from "urql";
import { API_URL } from "../../constants";

export const apiClient = createClient({
  url: API_URL,
});

import axios from "axios";
import { errorInterceptor } from "./interceptors/errorInterceptor";
import { responseInterceptor } from "./interceptors/responseInterceptor";

import { Environment } from "../../../environment";

const Api = axios.create({
  baseURL: Environment.URL_BASE,
});

Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error)
);

export { Api };

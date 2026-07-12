import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

type ContentType = "json" | "form-data";
type HttpHeaders = Record<string, string>;

export default class HttpClient {
  private readonly http: AxiosInstance;
  private contentHeaders: HttpHeaders = {
    "Content-Type": "application/json",
  };

  constructor(baseURL = import.meta.env.VITE_API_URL) {
    this.http = axios.create({
      baseURL,
      headers: this.contentHeaders,
    });
  }

  setContentType(type: ContentType) {
    this.contentHeaders = {
      "Content-Type":
        type === "json" ? "application/json" : "multipart/form-data",
    };
  }

  private buildHeaders(extraHeaders?: Record<string, string>) {
    return {
      ...this.contentHeaders,
      ...extraHeaders,
    };
  }

  async get<TResponse>(url: string, config: AxiosRequestConfig = {}) {
    const response = await this.http.get<TResponse>(url, {
      ...config,
      headers: this.buildHeaders(config.headers as Record<string, string> | undefined),
    });

    return response.data;
  }

  async post<TResponse, TPayload = unknown>(
    url: string,
    data?: TPayload,
    config: AxiosRequestConfig = {},
  ) {
    const response = await this.http.post<TResponse>(url, data, {
      ...config,
      headers: this.buildHeaders(config.headers as Record<string, string> | undefined),
    });

    return response.data;
  }

  async put<TResponse, TPayload = unknown>(
    url: string,
    data?: TPayload,
    config: AxiosRequestConfig = {},
  ) {
    const response = await this.http.put<TResponse>(url, data, {
      ...config,
      headers: this.buildHeaders(config.headers as Record<string, string> | undefined),
    });

    return response.data;
  }

  async patch<TResponse, TPayload = unknown>(
    url: string,
    data?: TPayload,
    config: AxiosRequestConfig = {},
  ) {
    const response = await this.http.patch<TResponse>(url, data, {
      ...config,
      headers: this.buildHeaders(config.headers as Record<string, string> | undefined),
    });

    return response.data;
  }

  async delete<TResponse>(url: string, config: AxiosRequestConfig = {}) {
    const response = await this.http.delete<TResponse>(url, {
      ...config,
      headers: this.buildHeaders(config.headers as Record<string, string> | undefined),
    });

    return response.data;
  }
}
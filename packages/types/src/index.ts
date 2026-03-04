export type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "HEAD"
  | "OPTIONS";

export type BodyType =
  | "json"
  | "xml"
  | "form-data"
  | "urlencoded"
  | "raw"
  | "binary"
  | "none";

export type AuthType =
  | "none"
  | "bearer"
  | "basic"
  | "api-key"
  | "oauth2"
  | "digest"
  | "aws-sig-v4";

export interface KeyValuePair {
  key: string;
  value: string;
  enabled: boolean;
}

export interface RequestConfig {
  name: string;
  method: HttpMethod;
  url: string;
  description?: string;
  headers?: KeyValuePair[];
  params?: KeyValuePair[];
  body?: {
    type: BodyType;
    content: string;
  };
  auth?: {
    type: AuthType;
    [key: string]: unknown;
  };
}

export interface ResponseData {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: string;
  time: number;
  size: number;
}

export interface Environment {
  name: string;
  variables: Record<string, string>;
  secrets?: string[];
}

export interface Collection {
  name: string;
  version: number;
}

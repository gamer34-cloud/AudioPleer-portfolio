export interface field {
  text: string;
  index: number;
}

export interface fields {
  username: string;
  password: number | string;
}

export interface track {
  id: string;
  title: string;
  artist: string;
  duration: number;
}

export type zodState = {
  origin?: string;
  code: string;
  minimum: number;
  inclusive: boolean;
  path?: [];
  message: string;
};

export interface exampleResponse {
  message: string;
  token: string;
}

export type song = {
  id: string | number;
  title: string;
  description: string;
  duration: string;
};
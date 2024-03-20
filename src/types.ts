export type Team = {
  id: number;
  name: string;
  description?: string;
}

export type Game = {
  id: number;
  date: Date;
  home?: {
    name: string;
    score: number;
  };
  away?: {
    name: string;
    score: number;
  };
}
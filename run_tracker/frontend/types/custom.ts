export type RunViewModel = {
  userId: string;
  date: Date;
  distance: number;
  comment: string;
};

export type Run = RunViewModel & {
  id: string;
};

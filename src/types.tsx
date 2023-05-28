export type RootStackParamList = {
  Movies: undefined;
  Movie: {
    id: number;
  };
  Reminders: undefined;
  Loading: undefined;
};

export interface Movie {
  id: number;
  title: string;
  originalTitle: string;
  releaseData: string;
  overview: string;
  posterUrl: string | null;
}

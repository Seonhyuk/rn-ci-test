export type RootStackParamList = {
  Movies: undefined;
};

export interface Movie {
  title: string;
  originalTitle: string;
  releaseData: string;
  overview: string;
  posterUrl: string | null;
}

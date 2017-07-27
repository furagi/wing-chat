export interface Page<T> {
  nextPageToken?: string;
  resultSizeEstimate: number;
  list: T[];
}

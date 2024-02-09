export type DistributeOptions<T> =
  | {
    action: "PUT";
    key: string;
    value: T;
    ttl: number;
    swr: number;
    route: string;
  }
  | { action: "DELETE"; key: string; route: string };



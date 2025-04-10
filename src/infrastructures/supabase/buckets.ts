const BUCKETS = {} as const;

export type BucketType = (typeof BUCKETS)[keyof typeof BUCKETS];

export default BUCKETS;

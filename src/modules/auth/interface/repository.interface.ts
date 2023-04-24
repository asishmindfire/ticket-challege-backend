export interface Repository<T> {
  // find(query: any): Promise<T[]>;
  findOne(query: any): Promise<T | undefined>;
  create(data: T): Promise<T>;
  // update(query: any, data: T): Promise<T>;
  // delete(query: any): Promise<void>;
}

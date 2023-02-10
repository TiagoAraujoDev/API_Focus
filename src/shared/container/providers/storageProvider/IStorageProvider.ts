interface IStorageProvider {
  get(file: string): Promise<string>;
  save(file: string, mimeType: string): Promise<void>;
  delete(file: string): Promise<void>;
}

export { IStorageProvider };

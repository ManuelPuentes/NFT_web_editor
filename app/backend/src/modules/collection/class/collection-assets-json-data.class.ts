export class CollectionAssetsJsonData {
  private data: Record<string, Record<string, any>>;

  constructor(data: Record<string, Record<string, any>>) {
    this.data = data;
  }

  get({
    trait_name,
    element_name,
  }: {
    trait_name: string;
    element_name: string;
  }): any {
    return this.data[trait_name][element_name];
  }
}

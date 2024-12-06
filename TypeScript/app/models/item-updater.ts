import { Item } from "./item";

// Define an interface for updating items
export interface ItemUpdater {
  update(item: Item): void;
}
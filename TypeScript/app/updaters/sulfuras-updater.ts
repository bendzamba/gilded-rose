import { Item } from "../models/item";
import { ItemUpdater } from "../models/item-updater";

export class SulfurasUpdater implements ItemUpdater {
  update(item: Item): void {
    // Sulfuras, being a legendary item, never changes!
  }
}
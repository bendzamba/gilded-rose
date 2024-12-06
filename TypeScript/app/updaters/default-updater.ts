import { Item } from "../models/item";
import { ItemUpdater } from "../models/item-updater";
import Config from "../config/config";

// Default Item 
export class DefaultItemUpdater implements ItemUpdater {
  update(item: Item): void {
    // Our sellIn day decreases by one
    item.sellIn -= 1;
    const qualityDecrease: number = item.sellIn < 0 ? 2 : 1;
    // Set to new quality or minimum, whichever is greater
    item.quality = Math.max(item.quality - qualityDecrease, Config.MINIMUM_QUALITY);
  }
}
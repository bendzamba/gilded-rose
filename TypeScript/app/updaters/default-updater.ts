import { Item } from "@/models/item";
import { ItemUpdater } from "@/models/item-updater";
import Config from "@/config/config";

// Default Item 
export class DefaultItemUpdater implements ItemUpdater {
  update(item: Item): void {
    // Our sellIn day decreases by one
    item.sellIn -= 1;
    // If the item quality falls too low, it will not decrease
    if (item.quality > Config.MINIMUM_QUALITY) {
      item.quality -= item.sellIn < 0 ? 2 : 1;
    }
    // Catch the scenario where we reduced by two, from one, and now have a negative quality
    if (item.quality < Config.MINIMUM_QUALITY) item.quality = Config.MINIMUM_QUALITY;
  }
}
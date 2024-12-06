import { Item } from "@/models/item";
import { ItemUpdater } from "@/models/item-updater";

// Default Item 
export class DefaultItemUpdater implements ItemUpdater {
  update(item: Item): void {
    // Our sellIn day decreases by one
    item.sellIn -= 1;
    // If the item quality is zero, it will not decrease
    if (item.quality > 0) {
      item.quality -= item.sellIn < 0 ? 2 : 1;
    }
    // Catch the scenario where we reduced by two, from one, and now have a negative quality
    if (item.quality < 0) item.quality = 0;
  }
}
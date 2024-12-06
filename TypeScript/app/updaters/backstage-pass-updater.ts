import { Item } from "@/models/item";
import { ItemUpdater } from "@/models/item-updater";

export class BackstagePassUpdater implements ItemUpdater {
  update(item: Item): void {
    item.sellIn -= 1;
    if (item.sellIn < 0) {
      item.quality = 0;
    } else if (item.sellIn < 5) {
      item.quality += 3;
    } else if (item.sellIn < 10) {
      item.quality += 2;
    } else {
      item.quality += 1;
    }
    // Catch the scenario where we increased above 50
    if (item.quality > 50) {
      item.quality = 50;
    }
  }
}
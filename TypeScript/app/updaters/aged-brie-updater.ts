import { Item } from "@/models/item";
import { ItemUpdater } from "@/models/item-updater";

export class AgedBrieUpdater implements ItemUpdater {
  update(item: Item): void {
    item.sellIn -= 1;
    // Item quality increases with age, doubly so once our sell by date has passed
    // It maxes out at 50
    if (item.quality < 50) {
      item.quality += item.sellIn < 0 ? 2 : 1;
    }
    // Catch the scenario where we increased above 50
    if (item.quality > 50) item.quality = 50;
  }
}
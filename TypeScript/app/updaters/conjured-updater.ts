import { Item } from "@/models/item";
import { ItemUpdater } from "@/models/item-updater";

export class ConjuredUpdater implements ItemUpdater {
  update(item: Item): void {
    item.sellIn -= 1;
    // Item quality decreases twice as fast as normal
    item.quality -= 2;
    if (item.quality < 0) {
      item.quality = 0;
    }
  }
}
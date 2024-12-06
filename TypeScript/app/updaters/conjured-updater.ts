import { Item } from "@/models/item";
import { ItemUpdater } from "@/models/item-updater";
import Config from "@/config/config";

export class ConjuredUpdater implements ItemUpdater {
  update(item: Item): void {
    item.sellIn -= 1;
    // Item quality decreases twice as fast as normal
    item.quality -= 2;
    if (item.quality < Config.MINIMUM_QUALITY) {
      item.quality = Config.MINIMUM_QUALITY;
    }
  }
}
import { Item } from "@/models/item";
import { ItemUpdater } from "@/models/item-updater";
import Config from "@/config/config";

export class ConjuredUpdater implements ItemUpdater {
  update(item: Item): void {
    item.sellIn -= 1;
    // Item quality decreases twice as fast as normal
    const qualityDecrease = 2;
    // Set to new quality or minimum, whichever is greater
    item.quality = Math.max(item.quality - qualityDecrease, Config.MINIMUM_QUALITY);
  }
}
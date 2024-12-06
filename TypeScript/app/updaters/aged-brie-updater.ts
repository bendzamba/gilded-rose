import { Item } from "@/models/item";
import { ItemUpdater } from "@/models/item-updater";
import Config from "@/config/config";

export class AgedBrieUpdater implements ItemUpdater {
  update(item: Item): void {
    item.sellIn -= 1;
    // Item quality increases with age, doubly so once our sell by date has passed
    const qualityIncrease: number = item.sellIn < 0 ? 2 : 1;
    // Set to new quality or maximum, whichever is less
    item.quality = Math.min(item.quality + qualityIncrease, Config.MAXIMUM_QUALITY);
  }
}
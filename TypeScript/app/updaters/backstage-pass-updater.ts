import { Item } from "@/models/item";
import { ItemUpdater } from "@/models/item-updater";
import Config from "@/config/config";

export class BackstagePassUpdater implements ItemUpdater {
  update(item: Item): void {
    item.sellIn -= 1;
    let qualityIncrease: number;
    if (item.sellIn < 0) {
      qualityIncrease = -item.quality;
    } else if (item.sellIn < 5) {
      qualityIncrease = 3;
    } else if (item.sellIn < 10) {
      qualityIncrease = 2;
    } else {
      qualityIncrease = 1;
    }
    // Set to new quality or maximum, whichever is less
    item.quality = Math.min(item.quality + qualityIncrease, Config.MAXIMUM_QUALITY);
  }
}
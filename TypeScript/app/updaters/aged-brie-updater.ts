import { Item } from "@/models/item";
import { ItemUpdater } from "@/models/item-updater";
import Config from "@/config/config";

export class AgedBrieUpdater implements ItemUpdater {
  update(item: Item): void {
    item.sellIn -= 1;
    // Item quality increases with age, doubly so once our sell by date has passed
    if (item.quality < Config.MAXIMUM_QUALITY) {
      item.quality += item.sellIn < 0 ? 2 : 1;
    }
    // Catch the scenario where we increased above the maximum
    if (item.quality > Config.MAXIMUM_QUALITY) item.quality = Config.MAXIMUM_QUALITY;
  }
}
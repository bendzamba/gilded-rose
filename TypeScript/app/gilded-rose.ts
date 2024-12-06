import { Item } from "@/models/item";
import { ItemUpdater } from "@/models/item-updater";
import { AgedBrieUpdater } from "@/updaters/aged-brie-updater";
import { BackstagePassUpdater } from "@/updaters/backstage-pass-updater";
import { ConjuredUpdater } from "@/updaters/conjured-updater";
import { DefaultItemUpdater } from "@/updaters/default-updater";
import { SulfurasUpdater } from "@/updaters/sulfuras-updater";


export class GildedRose {
  items: Array<Item>;

  private updaters: { [key: string]: ItemUpdater } = {
    "Aged Brie": new AgedBrieUpdater(),
    "Sulfuras, Hand of Ragnaros": new SulfurasUpdater(),
    "Backstage passes to a TAFKAL80ETC concert": new BackstagePassUpdater(),
    "Conjured": new ConjuredUpdater(),
  };

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {

    for (const item of this.items) {
      const updater = this.updaters[item.name] || new DefaultItemUpdater();
      updater.update(item);
    }
    return this.items;
  }
}

import { Item } from "./models/item";
import { ItemUpdater } from "./models/item-updater";
import { AgedBrieUpdater } from "./updaters/aged-brie-updater";
import { BackstagePassUpdater } from "./updaters/backstage-pass-updater";
import { ConjuredUpdater } from "./updaters/conjured-updater";
import { DefaultItemUpdater } from "./updaters/default-updater";
import { SulfurasUpdater } from "./updaters/sulfuras-updater";


export class GildedRose {
  items: Array<Item>;

  private updaters: { [key: string]: ItemUpdater } = {
    "Aged Brie": new AgedBrieUpdater(),
    "Sulfuras": new SulfurasUpdater(),
    "Backstage passes": new BackstagePassUpdater(),
    "Conjured": new ConjuredUpdater(),
  };

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {

    for (const item of this.items) {
      // Check for an updater by the prefix of the item's name
      const updaterName: string | undefined = Object.keys(this.updaters).find(key => item.name.startsWith(key));
      let updater: ItemUpdater;

      if (updaterName) {
        // Call the corresponding updater function
        updater = this.updaters[updaterName];
      } else {
        // Default updater for items that don't match any category
        updater = new DefaultItemUpdater();
      }
      updater.update(item);
    }
    return this.items;
  }
}

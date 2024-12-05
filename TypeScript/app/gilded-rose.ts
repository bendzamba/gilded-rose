export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

// Define an interface for updating items
interface ItemUpdater {
  update(item: Item): void;
}

// Default Item Updater
class DefaultItemUpdater implements ItemUpdater {
  update(item: Item): void {
    // Our sellIn day decreases by one
    item.sellIn -= 1;
    // If the item quality is zero, it will not decrease
    if (item.quality > 0) {
      item.quality -= item.sellIn < 0 ? 2 : 1;
    }
    // Catch the scenario where we reduced by two, from one, and now have a negative quality
    if (item.quality < 0) item.quality = 0;
  }
}

class AgedBrieUpdater implements ItemUpdater {
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

class SulfurasUpdater implements ItemUpdater {
  update(item: Item): void {
    // Sulfuras, being a legendary item, never changes!
  }
}

class BackstagePassUpdater implements ItemUpdater {
  update(item: Item): void {
    item.sellIn -= 1;
    if (item.sellIn < 0) {
      item.quality = 0;
    } else if (item.sellIn <= 5) {
      item.quality += 3;
    } else if (item.sellIn <= 10) {
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

export class GildedRose {
  items: Array<Item>;

  private updaters: { [key: string]: ItemUpdater } = {
    "Aged Brie": new AgedBrieUpdater(),
    "Sulfuras, Hand of Ragnaros": new SulfurasUpdater(),
    "Backstage passes to a TAFKAL80ETC concert": new BackstagePassUpdater(),
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

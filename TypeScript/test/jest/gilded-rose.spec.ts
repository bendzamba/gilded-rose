import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {

  describe('Sell In Date', () => {
    it.each([
      ['Normal Item', 10, 20, 9],
      ['Normal Item', 0, 20, -1],
      ['Sulfuras, Hand of Ragnaros', 10, 80, 10],
    ])(
      'Should update the sellIn date for "%s" to %i',
      (name: string, sellIn: number, quality: number, expectedSellIn: number) => {
        const items = [new Item(name, sellIn, quality)];
        const gildedRose = new GildedRose(items);

        gildedRose.updateQuality();

        expect(items[0].sellIn).toBe(expectedSellIn)
      }
    )
  });

  describe('Quality', () => {
    it.each([
      ['Normal Item', 1, 1, 0],
      ['Normal Item', 0, 20, 18],
      ['Normal Item', 0, 2, 0],
      ['Normal Item', 1, 0, 0],
      ['Sulfuras, Hand of Ragnaros', 10, 80, 80],
      ['Aged Brie', 1, 10, 11],
      ['Aged Brie', 1, 49, 50],
      ['Aged Brie', 1, 50, 50],
      ['Aged Brie', 0, 10, 12],
      ['Aged Brie', 0, 48, 50],
      ['Aged Brie', 0, 49, 50],
      ['Aged Brie', 0, 50, 50],
      ['Backstage passes to a TAFKAL80ETC concert', 15, 10, 11],
      ['Backstage passes to a TAFKAL80ETC concert', 11, 10, 11],
      ['Backstage passes to a TAFKAL80ETC concert', 10, 10, 12],
      ['Backstage passes to a TAFKAL80ETC concert', 6, 10, 12],
      ['Backstage passes to a TAFKAL80ETC concert', 5, 10, 13],
      ['Backstage passes to a TAFKAL80ETC concert', 0, 10, 0],
      ['Backstage passes to a TAFKAL80ETC concert', 5, 48, 50],
      ['Backstage passes to a TAFKAL80ETC concert', 10, 49, 50],
      ['Backstage passes to a TAFKAL80ETC concert', 12, 50, 50],
      ['Conjured', 10, 10, 8],
      ['Conjured', 10, 1, 0],
      ['Conjured', 10, 0, 0],
    ])(
      'Should update the sellIn date for "%s" to %i',
      (name: string, sellIn: number, quality: number, expectedQuality: number) => {
        const items = [new Item(name, sellIn, quality)];
        const gildedRose = new GildedRose(items);

        gildedRose.updateQuality();

        expect(items[0].quality).toBe(expectedQuality)
      }
    )
  });

  describe('Name', () => {

    it('should retain the name given to it', () => {
      const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
      const items = gildedRose.updateQuality();
      const firstItem = items[0];
      expect(firstItem.name).toBe('foo');
    });

  });

});


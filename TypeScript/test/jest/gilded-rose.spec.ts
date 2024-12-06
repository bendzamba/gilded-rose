import { GildedRose } from '@/gilded-rose';
import { Item } from '@/models/item';

describe('Gilded Rose', () => {

  describe('Sell In Date', () => {
    it.each([
      ['Normal Item', 10, 20, 9], // should decrease by 1
      ['Normal Item', 0, 20, -1], // should decrease by 1 into the negative
      ['Sulfuras, Hand of Ragnaros', 10, 80, 10], // should not decrease
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
      ['Normal Item', 1, 1, 0], // should decrease by 1
      ['Normal Item', 0, 20, 18], // should decrease doubly after sellIn date, by 2
      ['Normal Item', 0, 2, 0], // should decrease doubly after sellIn date, by 2, to minimum
      ['Normal Item', 1, 0, 0], // should not decrease below minimum
      ['Sulfuras, Hand of Ragnaros', 10, 80, 80], // should not change
      ['Aged Brie', 1, 10, 11], // should increase by 1
      ['Aged Brie', 1, 49, 50], // should increase by 1 to maximum
      ['Aged Brie', 1, 50, 50], // should not increase beyond maximum
      ['Aged Brie', 0, 10, 12], // should increase by 2 after sellIn date
      ['Aged Brie', 0, 48, 50], // should increase by 2 after sellIn date up to maximum
      ['Aged Brie', 0, 49, 50], // should not increase beyond maximum
      ['Aged Brie', 0, 50, 50], // should not increase beyond maximum
      ['Backstage passes to a TAFKAL80ETC concert', 15, 10, 11], // should increase by 1
      ['Backstage passes to a TAFKAL80ETC concert', 11, 10, 11], // should increase by 1 through day 11
      ['Backstage passes to a TAFKAL80ETC concert', 10, 10, 12], // should increase by 2 starting day 10
      ['Backstage passes to a TAFKAL80ETC concert', 6, 10, 12], // should increase by 2 through day 6
      ['Backstage passes to a TAFKAL80ETC concert', 5, 10, 13], // should increase by 3 starting day 5
      ['Backstage passes to a TAFKAL80ETC concert', 0, 10, 0], // should drop to minimum after day 0
      ['Backstage passes to a TAFKAL80ETC concert', 5, 48, 50], // should increase by 2 up to maximum
      ['Backstage passes to a TAFKAL80ETC concert', 10, 49, 50], // should not increase beyond maximum
      ['Backstage passes to a TAFKAL80ETC concert', 12, 50, 50], // should not increase beyond maximum
      ['Conjured', 10, 10, 8], // should decrease by 2
      ['Conjured', 10, 1, 0], // should not decrease below minimum
      ['Conjured', 10, 0, 0], // should not decrease below minimum
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


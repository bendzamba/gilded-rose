import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {

  describe('Normal Item', () => {

    it('should retain the name given to it', () => {
      const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
      const items = gildedRose.updateQuality();
      const firstItem = items[0];
      expect(firstItem.name).toBe('foo');
    });
  
    it('should decrease the sell by date by one', () => {
      const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
      const items = gildedRose.updateQuality();
      const firstItem = items[0];
      expect(firstItem.sellIn).toBe(-1);
    });
  
    it('should not degrade below zero', () => {
      const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
      const items = gildedRose.updateQuality();
      const firstItem = items[0];
      expect(firstItem.quality).toBe(0);
    });
  
    it('should degrade by one in quality', () => {
      const gildedRose = new GildedRose([new Item('foo', 5, 10)]);
      const items = gildedRose.updateQuality();
      const firstItem = items[0];
      expect(firstItem.quality).toBe(9);
    });
  
    it('should degrade by two in quality once sell by date has passed', () => {
      const gildedRose = new GildedRose([new Item('foo', 0, 20)]);
      const items = gildedRose.updateQuality();
      const firstItem = items[0];
      expect(firstItem.quality).toBe(18);
    });
  })

});


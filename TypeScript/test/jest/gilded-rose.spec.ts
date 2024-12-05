import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should have the name foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    const firstItem = items[0];
    expect(firstItem.name).toBe('foo');
    expect(firstItem.quality).toBe(0);
    expect(firstItem.sellIn).toBe(-1);
  });

});


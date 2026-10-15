const { filterByCategory } = require('../../src/catalog');
const products = require('../../src/data/products');

describe('filterByCategory', () => {
  test('Все категории: категория "all"', () => {
    const result = filterByCategory(products, 'all');
    expect(result.map(p => p.id)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('Все категории: категория undefined', () => {
    const result = filterByCategory(products, undefined);
    expect(result.map(p => p.id)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('Все категории: пустая строка ""', () => {
    const result = filterByCategory(products, '');
    expect(result.map(p => p.id)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('Существующая категория: "electronics"', () => {
    const result = filterByCategory(products, 'electronics');
    expect(result.map(p => p.id)).toEqual([1, 2]);
  });

  test('Существующая категория: "books"', () => {
    const result = filterByCategory(products, 'books');
    expect(result.map(p => p.id)).toEqual([3, 6]);
  });

  test('Существующая категория: "home"', () => {
    const result = filterByCategory(products, 'home');
    expect(result.map(p => p.id)).toEqual([4, 5]);
  });

  test('Несуществующая категория: "clothes"', () => {
    const result = filterByCategory(products, 'clothes');
    expect(result.map(p => p.id)).toEqual([]);
  });

  test('Несуществующая категория: "toys"', () => {
    const result = filterByCategory(products, 'toys');
    expect(result.map(p => p.id)).toEqual([]);
  });

  test('Несуществующая категория: "sports"', () => {
    const result = filterByCategory(products, 'sports');
    expect(result.map(p => p.id)).toEqual([]);
  });
});
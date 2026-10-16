const { sortProductsByPrice } = require('../../src/catalog');
const products = require('../../src/data/products');

describe('sortProductsByPrice', () => {
  test('По возрастанию: все products, направление "asc"', () => {
    const result = sortProductsByPrice(products, 'asc');
    expect(result.map(p => p.id)).toEqual([3, 6, 5, 4, 2, 1]);
  });

  test('По возрастанию: все products, направление не передано', () => {
    const result = sortProductsByPrice(products);
    expect(result.map(p => p.id)).toEqual([3, 6, 5, 4, 2, 1]);
  });

  test('По возрастанию: товары с ID [1, 3, 4], направление "asc"', () => {
    const subset = products.filter(({ id }) => [1, 3, 4].includes(id));
    const result = sortProductsByPrice(subset, 'asc');
    expect(result.map(p => p.id)).toEqual([3, 4, 1]);
  });

  test('По убыванию: все products, направление "desc"', () => {
    const result = sortProductsByPrice(products, 'desc');
    expect(result.map(p => p.id)).toEqual([1, 2, 4, 5, 6, 3]);
  });

  test('По убыванию: товары с ID [3, 1, 4], направление "desc"', () => {
    const subset = products.filter(({ id }) => [3, 1, 4].includes(id));
    const result = sortProductsByPrice(subset, 'desc');
    expect(result.map(p => p.id)).toEqual([1, 4, 3]);
  });

  test('По убыванию: товары с ID [5, 2, 6], направление "desc"', () => {
    const subset = products.filter(({ id }) => [5, 2, 6].includes(id));
    const result = sortProductsByPrice(subset, 'desc');
    expect(result.map(p => p.id)).toEqual([2, 5, 6]);
  });

  test('Исходный массив не меняется: товары с ID [1, 3, 4], вызов с "asc"', () => {
    const subset = products.filter(({ id }) => [1, 3, 4].includes(id));
    const originalOrder = subset.map(p => p.id);
    sortProductsByPrice(subset, 'asc');
    expect(subset.map(p => p.id)).toEqual(originalOrder);
  });

  test('Исходный массив не меняется: товары с ID [1, 3, 4], вызов с "desc"', () => {
    const subset = products.filter(({ id }) => [1, 3, 4].includes(id));
    const originalOrder = subset.map(p => p.id);
    sortProductsByPrice(subset, 'desc');
    expect(subset.map(p => p.id)).toEqual(originalOrder);
  });

  test('Исходный массив не меняется: все products, направление не передано', () => {
    const originalOrder = products.map(p => p.id);
    sortProductsByPrice(products);
    expect(products.map(p => p.id)).toEqual(originalOrder);
  });
});
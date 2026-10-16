const { searchProducts } = require('../../src/catalog');
const products = require('../../src/data/products');

describe('searchProducts', () => {
  test('Точное совпадение: запрос "Наушники"', () => {
    const result = searchProducts(products, 'Наушники');
    expect(result.map(p => p.id)).toEqual([1]);
  });

  test('Точное совпадение: запрос "Чистый код"', () => {
    const result = searchProducts(products, 'Чистый код');
    expect(result.map(p => p.id)).toEqual([6]);
  });

  test('Точное совпадение: запрос "Настольная лампа"', () => {
    const result = searchProducts(products, 'Настольная лампа');
    expect(result.map(p => p.id)).toEqual([4]);
  });

  test('Регистр не влияет на поиск: запрос "javascript"', () => {
    const result = searchProducts(products, 'javascript');
    expect(result.map(p => p.id)).toEqual([3]);
  });

  test('Регистр не влияет на поиск: запрос "ЧЕХОЛ"', () => {
    const result = searchProducts(products, 'ЧЕХОЛ');
    expect(result.map(p => p.id)).toEqual([5]);
  });

  test('Регистр не влияет на поиск: запрос "наушники"', () => {
    const result = searchProducts(products, 'наушники');
    expect(result.map(p => p.id)).toEqual([1]);
  });

  test('Пустой запрос: запрос ""', () => {
    const result = searchProducts(products, '');
    expect(result.map(p => p.id)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('Пустой запрос: запрос "   "', () => {
    const result = searchProducts(products, '   ');
    expect(result.map(p => p.id)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('Пустой запрос: запрос "\\t\\n"', () => {
    const result = searchProducts(products, '\t\n');
    expect(result.map(p => p.id)).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
export default function wordChangeEnding(int) {
  const array = ['товар', 'товара', 'товаров'];
  if (int % 100 > 4 && int % 100 < 20) {
    return array[2];
  }
  if (int % 10 < 5) {
    return array[[2, 0, 1, 1, 1, 2][int % 10]];
  }

  return array[2];
}

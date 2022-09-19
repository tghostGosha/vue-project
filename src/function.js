// const alertText = (el) => {
//   alert(el);
// };
// export default alertText;

export function unDuplicateArraySingleValues(array) {
  // Проверка, что это не пустой массив
  if ((Array.isArray(array) || array instanceof Array)
    && array.length) {
    // Возвращает массив уникальных значений
    return array.filter((currValue, ind) => array.indexOf(currValue) === ind);
  }
  // Это не заполненный массив,
  // возвращаем переданное без изменений
  return array;
}
export function unDuplicateArrayObjects(array, propertyName) {
  if ((Array.isArray(array) || array instanceof Array)
    && array.length
    && typeof propertyName === 'string'
    && propertyName.length) {
    // Массив значений из ключа propertyName, который надо проверить
    const objectValuesArrayFromKey = array.map((item) => item[propertyName]);

    // Удалить дубли этих значений с помощью предыдущей функции
    const uniqueValues = unDuplicateArraySingleValues(objectValuesArrayFromKey);

    // Вернуть массив только с уникальными объектами
    return uniqueValues.map(
      (key) => array.find(
        (item) => item[propertyName] === key,
      ),
    );
  }
  return array;
}

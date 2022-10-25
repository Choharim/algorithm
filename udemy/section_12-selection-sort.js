function selectionSort(array) {
  let smallestIndex;

  for (let i = 0; i < array.length - 1; i++) {
    smallestIndex = i;

    for (let j = i + 1; j < array.length; j++) {
      if (array[smallestIndex] > array[j]) {
        smallestIndex = j;
      }
    }

    if (smallestIndex !== i) {
      [array[smallestIndex], array[i]] = [array[i], array[smallestIndex]];
    }
  }

  return array;
}

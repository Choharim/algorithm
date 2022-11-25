/**
Given an array of 1s and 0s which has all 1s first followed by all 0s, write a function called countZeroes, which returns the number of zeroes in the array.

countZeroes([1,1,1,1,0,0]) // 2
countZeroes([1,0,0,0,0]) // 4
countZeroes([0,0,0]) // 3
countZeroes([1,1,1,1]) // 0
Time Complexity - O(log n)
 */
function countZeroes(arr) {
  if (arr[0] === 0) return arr.length;
  if (arr[arr.length - 1] === 1) return 0;

  let index;
  let lp = 0;
  let rp = arr.length - 1;
  let middelP;

  while (lp < rp) {
    middelP = Math.floor((lp + rp) / 2);

    if (arr[middelP] === 0) {
      if (arr[middelP - 1] === 1) {
        index = middelP - 1;

        break;
      } else {
        rp = middelP - 1;
      }
    } else if (arr[middelP] === 1) {
      if (arr[middelP + 1] === 0) {
        index = middelP;
        break;
      } else {
        lp = middelP + 1;
      }
    }
  }

  return arr.length - 1 - index;
}
// console.log(countZeroes([1, 1, 1, 1, 0, 0])); // 2
// console.log(countZeroes([1, 0, 0, 0, 0])); // 4
// console.log(countZeroes([0, 0, 0])); // 3
// console.log(countZeroes([1, 1, 1, 1])); // 0

/**
 * Given a sorted array and a number, write a function called sortedFrequency that counts the occurrences of the number in the array

sortedFrequency([1,1,2,2,2,2,3],2) // 4 
sortedFrequency([1,1,2,2,2,2,3],3) // 1 
sortedFrequency([1,1,2,2,2,2,3],1) // 2 
sortedFrequency([1,1,2,2,2,2,3],4) // -1
Time Complexity - O(log n)
 */
function sortedFrequency(arr, num) {
  if (arr[0] > num || arr[arr.length - 1] < num) return -1;

  let lp = 0;
  let rp = arr.length - 1;

  while (lp < rp) {
    if (arr[lp] === num && arr[rp] === num) break;

    if (arr[lp] < num) {
      lp++;
    }
    if (arr[rp] > num) {
      rp--;
    }
  }

  return rp - lp + 1;
}
// console.log(sortedFrequency([1, 1, 2, 2, 2, 2, 3], 2)); // 4
// console.log(sortedFrequency([1, 1, 2, 2, 2, 2, 3], 3)); // 1
// console.log(sortedFrequency([1, 1, 2, 2, 2, 2, 3], 1)); // 2
// console.log(sortedFrequency([1, 1, 2, 2, 2, 2, 3], 4)); // -1

/**
 * Write a function called findRotatedIndex which accepts a rotated array of sorted numbers and an integer. The function should return the index of the integer in the array. If the value is not found, return -1.

Constraints:

Time Complexity - O(log n)

Space Complexity - O(1)

findRotatedIndex([3,4,1,2],4) // 1
findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 8) // 2
findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 3) // 6
findRotatedIndex([37,44,66,102,10,22],14) // -1
findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 12) // -1
findRotatedIndex([11,12,13,14,15,16,3,5,7,9], 16) // 5
 */

function findRotatedIndex(arr, num) {
  let middle = Math.ceil(arr.length / 2) - 1;

  while (middle < arr.length && middle > 0) {
    if (arr[0] > arr[middle]) {
      middle--;
    } else if (arr[0] < arr[middle]) {
      if (arr[middle] > arr[middle + 1]) break;
      middle++;
    }
  }

  let start;
  let end;
  if (arr[0] <= num && arr[middle] >= num) {
    start = 0;
    end = middle;
  } else {
    start = middle + 1;
    end = arr.length - 1;
  }

  for (let i = start; i <= end; i++) {
    if (arr[i] === num) return i;
  }
  return -1;
}
// console.log(findRotatedIndex([3, 4, 1, 2], 4)); // 1
// console.log(findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 8)); // 2
// console.log(findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 3)); // 6
// console.log(findRotatedIndex([37, 44, 66, 102, 10, 22], 14)); // -1
// console.log(findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 12)); // -1
// console.log(findRotatedIndex([11, 12, 13, 14, 15, 16, 3, 5, 7, 9], 16)); // 5

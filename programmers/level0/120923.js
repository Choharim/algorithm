function solution(num, total) {
  let left_number = 1;
  let right_number = num;
  let sum = ((1 + num) * num) / 2;

  while (sum !== total) {
    if (sum > total) {
      sum -= right_number;
      left_number--;
      right_number--;
      sum += left_number;
    } else {
      sum -= left_number;
      left_number++;
      right_number++;
      sum += right_number;
    }
  }

  let answer = [];

  for (let i = left_number; i <= right_number; i++) {
    answer.push(i);
  }

  return answer;
}

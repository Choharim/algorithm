function solution(numbers) {
  let dp = [numbers[0], numbers[0] + numbers[1]];

  for (let i = 2; i < numbers.length; i++) {
    dp[i] = Math.max((dp[i - 3] ?? 0) + numbers[i - 1], dp[i - 2]) + numbers[i];
  }

  return dp[numbers.length - 1];
}
console.log(solution(input.map(Number)));

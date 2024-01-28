const getMaxHoliday = (L, P, V) => {
  return Math.floor(V / P) * L + Math.min(V % P, L);
};

let result = "";
input.forEach((nums, i) => {
  const order = i + 1;
  if (order === input.length) return;

  const [l, p, v] = nums.split(" ").map(Number);

  if (order > 1) {
    result += "\n";
  }
  result += `Case ${order}: ${getMaxHoliday(l, p, v)}`;
});

console.log(result);

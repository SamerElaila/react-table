export default (data, newData) => {
  for (let i = 1; i < 4; i++) {
    let temp = data[i];
    data[i] = data[i + 1];
    data[i + 1] = temp;
  }
  data[4] = newData;
  return data;
};

export default (data = { a: [] }) =>
  Object.values(data).reduce((acc, curr) => [...acc, ...curr], []);

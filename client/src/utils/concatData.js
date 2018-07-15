export default data =>
  Object.values(data).reduce((acc, curr) => [...acc, ...curr], []);

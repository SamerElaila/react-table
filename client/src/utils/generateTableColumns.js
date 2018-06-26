const mapFun = col => ({
  Header: col,
  accessor: col,
  style: {
    width: 'auto'
  }
});

export default (columns, width) => {
  if (width <= 800) {
    return ['Symbol', 'Pattern', 'Current', 'WaveLength'].map(mapFun);
  }
  return columns.map(mapFun);
};

export default (row, column) => {
  let classes = 'row-cell ';
  switch (column.Header) {
    case 'Symbol':
      classes += 'fixed';
      break;
    case 'Pattern':
      classes += 'pattern';
      break;
    case 'WaveLength':
      classes += row.original.WLColor || '';
      break;
    case 'BetaAlpha':
      classes += row.original.BAColor || '';
      break;
    case 'Chg':
      classes += row.original.Color || '';
      break;
    default:
      break;
  }
  return classes;
};

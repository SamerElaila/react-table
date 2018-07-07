export default column => {
  switch (column.Header) {
    case 'Symbol':
      return 'fixed';
    case 'Pattern':
      return 'pattern';
    default:
      return '';
  }
};

const formatDate = (date) => {
  if (!date) return '';

  let parsedDate;


  if (/^\d{2}\/\d{4}$/.test(date)) {
    const [month, year] = date.split('/');
    parsedDate = new Date(`${year}-${month}-01`);
  }

  else if (/^\d{4}-\d{2}$/.test(date)) {
    parsedDate = new Date(`${date}-01`);
  }

  else {
    parsedDate = new Date(date);
  }

  if (isNaN(parsedDate)) return 'Invalid Date';

  return parsedDate.toLocaleDateString(undefined, {
    month: 'long',
    year: 'numeric',
  });
};

export default formatDate;

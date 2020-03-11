import millify from 'millify';

export default (number: number) => {
  try {
    return   millify(number, {
      units: ['', 'Thousand', 'Million', 'Billion', 'Trillion', 'Quadrillion', 'Quintillion', 'Sextillion', 'Septillion'],
      space: true,
      precision: 2,
    })
  } catch(err) {
    return String(number);
  }
};

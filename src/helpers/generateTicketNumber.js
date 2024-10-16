const generateRandomTwoDigitNumber = () => {
    return Math.floor(Math.random() * 100); 
  };
  
  const generateTicketNumber = (fromStation, toStation) => {
    const currentYear = new Date().getFullYear();
    const randomTwoDigitNumber = generateRandomTwoDigitNumber();
    return `${fromStation.toUpperCase().replace(/\s/g, '')}-${toStation.toUpperCase()}-${currentYear}-${randomTwoDigitNumber}`;
  };
  
  export { generateTicketNumber };
  
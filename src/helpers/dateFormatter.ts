function getDateParts(date: Date) {
    function twoDigitDate(number) {
        return number >= 10 ? number : `0${number}`;
    }

    const day = twoDigitDate(date.getDate());
    const month = twoDigitDate(date.getMonth() + 1);
    const year = date.getFullYear();

    return {day, month, year};
}

export default  function getFormattedDate(date: Date, type: string): string {

    console.log(date)

    if (!date) {
        return '';
    }

    const {day, month, year} = getDateParts(date);

    switch (type) {
        case 'mm.dd.yyyy': return month + '.' + day + '.' + year;
    }

    return  '';
}

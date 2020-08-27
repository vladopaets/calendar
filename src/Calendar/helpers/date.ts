function _transformToMilliseconds(days: number): number {
    return days * 24 * 60 * 60 * 1000; 
}

function getDaysInMonth(year: number, month: number): number | string {
    if (!year || !month) {
        return 'Please, provide year and month';
    }

    return new Date(year, month, 0).getDate();
}

function subtract(date: Date, count: number): Date | string {
    if(!date || typeof count === 'undefined') {
        return 'Please, provide date and count';
    }

    const _date = date.getTime();
    const _count = _transformToMilliseconds(count);
    const diff = _date - _count;

    return new Date(diff);
}

function add(date: Date, count: number): Date | string {
    if(!date || typeof count === 'undefined') {
        return 'Please, provide date and count';
    }

    if (count < 1) {
        return date;
    }

    const _date = date.getTime();
    const _count = _transformToMilliseconds(count);
    const diff = _date + _count;

    return new Date(diff);
}

export {getDaysInMonth, subtract, add};
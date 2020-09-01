export interface Props {
    onDayClick?: (day: Date) => void,
    selectedDay?: string
}

export interface Range {
    start: Date | string,
    end: Date | string,
}

export interface State {
    day: number,
    month: number,
    year: number
}
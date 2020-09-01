import React, {Component} from 'react';
import classNames from 'classnames';

import {getDaysInMonth, subtract, add, isTheSameDay} from '../../helpers/date';
import {MONTHS, WEEK_DAYS} from '../../constants';

import {Props, State, Range}from './interface';
import './styles.css';

class Calendar extends Component<Props, State> {
    private readonly MAX_DAYS_PER_WEEK = 7;

    constructor(props: Props) {
        super(props);

        const date = new Date();

        this.state = {
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear()
        };
    }

    get prevMonth(): {day: number, month: number, year: number} {
        const {month, year} = this.state;
        const date = new Date(`${month}.01.${year}`);

        date.setMonth(date.getMonth() - 1);

        return {
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear()
        };
    }

    get nextMonth(): {day: number, month: number, year: number} {
        const {month, year} = this.state;
        const nextMonth = new Date(year, month, 1);

        return {
            day: nextMonth.getDate(),
            month: nextMonth.getMonth() + 1,
            year: nextMonth.getFullYear()
        };
    }

    getRange = (month: number, year: number): Range => {
        const daysCount = getDaysInMonth(year, month);

        const firstDayOfCurrentMonth = new Date(`${month}.01.${year}`);
        const lastDayOfCurrentMonth = new Date(`${month}.${daysCount}.${year}`);

        const rangeStart = subtract(new Date(firstDayOfCurrentMonth), (firstDayOfCurrentMonth.getDay() || this.MAX_DAYS_PER_WEEK) - 1);
        const rangeEnd = add(new Date(lastDayOfCurrentMonth), 7 - (lastDayOfCurrentMonth.getDay() || this.MAX_DAYS_PER_WEEK));

        return {
            start: rangeStart,
            end: rangeEnd
        };
    }

    getCurrentMonthArr = (start: Date | string, end: Date | string): Array<Date> => {
        let loop = new Date(start);
        const arr: Date[] = [];

        arr.push(new Date(start));

        do {
            arr.push(loop);

            const newDate = loop.setDate(loop.getDate() + 1);
            loop = new Date(newDate);
        } while(loop < end);

        return arr;
    };

    renderMonth(monthRange: Range, currentMonth: number): JSX.Element {
        if (!monthRange) {
            return <> </>;
        }

        const {selectedDay = ''} = this.props;
        const {start, end} = monthRange;

        const rangeArr = this.getCurrentMonthArr(start, end);

        return (
            <div className='month'>
                <div className='week'>
                    {WEEK_DAYS.map((day, index) => (
                        <span key={index}>{day}</span>
                    ))}
                </div>
                <div className='inner'>
                    {rangeArr.map((item, index) => {
                        const date = new Date(item).getDate();
                        const month = new Date(item).getMonth() + 1;
                        const isDisabled = month !== currentMonth;

                        return (
                            <div
                                className={classNames('day', {
                                    'disabled': isDisabled,
                                    'selected': isTheSameDay(item, selectedDay)
                                })}
                                key={index}
                                onClick={() => this.onDayClick(item)}
                            >
                                {date}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    next = (): void => {
        const {month, year} = this.nextMonth;
        const currentMonth = new Date();
        let day = 1;

        if (currentMonth.getMonth() + 1 === month) {
            day = currentMonth.getDate();
        }

        this.setState({day, month, year});
    }

    prev = (): void => {
        const {month, year} = this.prevMonth;
        const currentMonth = new Date();
        let day = 1;

        if (currentMonth.getMonth() + 1 === month) {
            day = currentMonth.getDate();
        }

        this.setState({day, month, year});
    }

    onDayClick = (day: Date) => {
        const {onDayClick} = this.props;

        typeof onDayClick === 'function' && onDayClick(day);
    }

    render(): JSX.Element {
        const {day, month, year} = this.state;
        const currentMonthRange = this.getRange(month, year);

        return (
            <div className='wrapper'>
                <div className='calendar'>
                    <div className='title'>
                        <h2>{MONTHS[month]} {day} {year}</h2>
                        <div>
                            <span onClick={this.prev}>
                                <img src="./svg/arrow-left-thin.svg" alt="arrow left"/>
                            </span>
                            <span onClick={this.next}>
                                <img src="./svg/arrow-right-thin.svg" alt="arrow right"/>
                            </span>
                        </div>
                    </div>
                    {this.renderMonth(currentMonthRange, month)}
                </div>
            </div>
        );
    }
}

export default Calendar;
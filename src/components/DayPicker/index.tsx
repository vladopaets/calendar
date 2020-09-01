import React, {Component} from 'react';
import Calendar from "../Calendar";

import getFormattedDate from "../../helpers/dateFormatter";

import {State} from "./interface";
import './styles.css'

class DayPicker extends Component<any, State> {

    state = {
        date: new Date(),
        isOpen: false
    }

    render() {
        const {date, isOpen} = this.state;

        return (
            <div className='day-picker'>
                {isOpen && <div className='click-outside' onClick={() => this.setState({isOpen: false})}/>}
                <p onClick={() => this.setState({isOpen: true})}>
                    Choose date:
                    <span>{getFormattedDate(date, 'mm.dd.yyyy')}</span>
                    <img src="/svg/calendar.svg" alt=""/>
                </p>

                {isOpen && (
                    <div className='calendar-wrapper'>
                        <Calendar
                            selectedDay={getFormattedDate(date, 'mm.dd.yyyy')}
                            onDayClick={(day) => this.setState({date: day})}
                        />
                    </div>
                )}
            </div>
        )
    }
}

export default DayPicker;
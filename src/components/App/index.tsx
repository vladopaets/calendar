import React, {Component} from 'react';
import Calendar from "../Calendar";
import DayPicker from "../DayPicker";

import './styles.css';

class App extends Component<any, any> {

    render() {
        return (
            <div className='app'>
                <div className='app-calendar'>
                    <Calendar/>
                </div>
                <DayPicker/>
            </div>
        );
    }
}

export default App;

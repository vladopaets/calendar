import React, {Component} from 'react';
import Calendar from "../Calendar";

import './styles.css';

class Index extends Component<any, any> {

    render() {
        return (
            <div className='app'>
                <Calendar/>
            </div>
        );
    }
}

export default Index;

import React from 'react';
import ReactDOM from 'react-dom';

import {observer} from "mobx-react"
import {observable} from "mobx"

@observer 
class Timer extends React.Component {
    @observable secondsPassed = 0

    componentWillMount() {
        setInterval(() => {
            this.secondsPassed++
        }, 1000)
    }

    render() {
        return (<span>Seconds passed: { this.secondsPassed } </span> )
    }
}

export default Timer;
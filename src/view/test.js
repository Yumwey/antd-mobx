import React, { Component } from 'react';
import { observer  } from 'mobx-react'
import stores from '../stores'
class Test  extends Component {
    componentDidMount () {
        console.log('TEST', stores);
    }
    render() {
        return (
            <div>TEST!</div>
        )
    }
}
export default Test
import React, { Component } from 'react';
import { observer  } from 'mobx-react'
import stores from '../stores'

export default class More  extends Component {
    componentDidMount () {
        console.log('MORE', stores);
        console.log(stores)
    }
    render() {
        return (
            <div>MORE!</div>
        )
    }
}
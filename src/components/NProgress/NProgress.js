import React from 'react'
import PropTypes from 'prop-types'
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import './NProgress.scss'

class NProgressComponent extends React.Component {
   static defaultProps = {
       location: window.location.pathname
   }
   componentWillMount () {
       NProgress.start()
   }
   componentDidMount () {
       NProgress.done()
   }
   componentWillUpdate (prevProps, prevState) {
    if (prevProps.location !== this.props.location) {
        NProgress.start();
    }
   }
   componentDidUpdate () {
       NProgress.done();
   }
   render() {
        const children = this.props.children
        return (
            [React.Children.map(children, (child) => {
                return children;
            })]
        )
   }
}

NProgressComponent.propTypes = {
    children: PropTypes.element.isRequired,
    location: PropTypes.string
}

export default NProgressComponent

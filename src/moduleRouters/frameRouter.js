import React from 'react';
import appFrame from '../components/pageFrame/appFrame';
import Test from '../view/test';

const frameRouter = [
    {
        path: '/',
        component : appFrame,
        exact: true,
        routes: [{
            path:'/home/test',
            component: Test
        }]
    },
]

export default frameRouter;
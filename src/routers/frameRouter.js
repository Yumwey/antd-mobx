import React from 'react';
import appFrame from '../components/pageFrame/appFrame';
import Test from '../view/test';
import More from '../view/more';
import notFound from '../components/errorPage/notFound';

const frameRouter = [
    {
        path:'/',
        component : appFrame,
        routes: [
            {
                path: '/test',
                component: Test
            },
            {
                path:'/more',
                component: More
            }
        ]
    }
]

export default frameRouter;
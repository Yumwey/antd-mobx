import React from 'react';
import appFrame from '../components/pageFrame/appFrame';
import Test from '../view/test';
import More from '../view/more';
import notFound from '../components/errorPage/notFound';

const frameRouter = [
    {
        path:'/home',
        component : appFrame,
        routes: [
            {
                path: '/home/test',
                component: Test
            },
            {
                path:'/home/more',
                component: More
            },
            {
                path:'/home/name',
                component: More
            }
        ]
    },
    {
        path:'/more',
        component: More
    }
]

export default frameRouter;
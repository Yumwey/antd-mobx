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
                name: '列表模块案例',
                component: Test
            },
            {
                path:'/more',
                name: '详细新增案例',
                component: More
            }
        ]
    }
]

export default frameRouter;
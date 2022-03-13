import React, {} from 'react'
import './layoutAuth.css'
import SideImage from '../sideImage/SideImage'
import {  BrowserRouter, Route, Switch } from 'react-router-dom'
import Register from '../../pages/Register'
import Login from '../../pages/Login'

const LayoutAuth = () => {
    return (
        <BrowserRouter>
            <Route render={(props) => (
                <div>
                    <SideImage {...props}/>
                    <div className="layout__content_register ">
                        <div className="layout__content-main_register ">
                        <Switch>
                            <Route path='/' exact component={Login}/>
                            <Route path='/Register' exact component={Register}/>
                            <Route path='/Login' component={Login}/>
                        </Switch>
                        </div>
                    </div>
                </div>
            )}/>
        </BrowserRouter>
    )
}

export default LayoutAuth
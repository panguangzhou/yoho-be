import React, { Component } from 'react';
import { BrowserRouter as Router, Route,Link} from 'react-router-dom';
import Header from '../../components/xheader/Xheader.jsx'
import Orders from '../../components/orders/Orders.jsx'
import Dashborad from '../../containers/dashborad/Dashborad.jsx'
import Drdarde from '../../containers/ordarde/Ordarde.jsx'
import User from '../../containers/user/User.jsx'
import Product from '../../containers/product/Product.jsx'
import Report from '../../containers/report/Report.jsx'
import Statistics from '../../containers/statistics/Statistics.jsx'
class Home extends Component{
    render(){
        return(
            <div>
                <Header/>
                <Orders/>
                <Route path='/home' exact component={Dashborad}/>
                <Route path='/home/dashborad' component={Dashborad}/>
                <Route path='/home/drdarde' component={Drdarde}/>
                <Route path='/home/user' component={User}/>
                <Route path='/home/product' component={Product}/>
                <Route path='/home/report' component={Report}/>
                <Route path='/home/statistics' component={Statistics}/>
            </div>
        )
    }
}
export default Home
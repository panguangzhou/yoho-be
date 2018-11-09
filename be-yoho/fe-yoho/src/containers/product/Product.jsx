import React, { Component } from 'react';
import axios from 'axios'
class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shouban: [],
            xiezi: [],
            yanzao: [],
            bihua: []
        }
    }
    //每种产品的函数
    shouban() {
        let self = this;
        let name = '手办'
        axios.get('http://localhost:3000/api/traverse', {
            params: {
                name
            }
        })
            .then(function (response) {
                let shouban = self.state.shouban
                shouban = response.data;
                self.setState({
                    shouban
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    xiezi() {
        let self = this;
        let name = '鞋子'
        axios.get('http://localhost:3000/api/traverse', {
            params: {
                name
            }
        })
            .then(function (response) {
                let xiezi = self.state.xiezi
                xiezi = response.data;
                self.setState({
                    xiezi
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    yanzao() {
        let self = this;
        let name = '眼罩'
        let data = this.state.yanzao;
        axios.get('http://localhost:3000/api/traverse', {
            params: {
                name
            }
        })
            .then(function (response) {
                let yanzao = self.state.yanzao
                yanzao = response.data;
                self.setState({
                    yanzao
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    bihua() {
        let self = this;
        let name = '壁画'
        let data = this.state.bihua;
        axios.get('http://localhost:3000/api/traverse', {
            params: {
                name
            }
        })
            .then(function (response) {
                let bihua = self.state.bihua
                bihua = response.data;
                self.setState({
                    bihua
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    componentDidMount() {
        this.shouban();
        this.xiezi();
        this.yanzao();
        this.bihua();
    }
    render() {
        return (
            <div>
                <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                    <div className="panel panel-default">
                        <div className="panel-heading"><h2>手办</h2></div>
                        <table className="table">
                            <tr>
                                <td>序号</td>
                                <td>#</td>
                                <td>商品信息</td>
                                <td>商品单价</td>
                                <td>商品数量</td>
                                <td>热度</td>
                            </tr>
                            {(function (self) {
                                let list = self.state.shouban.map(function (item, index) {
                                    return <tr key={index}>
                                        <td>{index}</td>
                                        <td>{item.ids}</td>
                                        <td>{item.title}</td>
                                        <td>{item.price}</td>
                                        <td>{item.nums}</td>
                                        <td>{item.hot}</td>
                                    </tr>
                                })
                                return list;
                            })(this)}
                        </table>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-heading"><h2>鞋子</h2></div>
                        <table className="table">
                            <tr>
                                <td>序号</td>
                                <td>#</td>
                                <td>商品信息</td>
                                <td>商品单价</td>
                                <td>商品数量</td>
                                <td>热度</td>
                            </tr>
                            {(function (self) {
                                let list = self.state.xiezi.map(function (item, index) {
                                    return <tr key={index}>
                                        <td>{index}</td>
                                        <td>{item.ids}</td>
                                        <td>{item.title}</td>
                                        <td>{item.price}</td>
                                        <td>{item.nums}</td>
                                        <td>{item.hot}</td>
                                    </tr>
                                })
                                return list;
                            })(this)}
                        </table>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-heading"><h2>眼罩</h2></div>
                        <table className="table">
                            <tr>
                                <td>序号</td>
                                <td>#</td>
                                <td>商品信息</td>
                                <td>商品单价</td>
                                <td>商品数量</td>
                                <td>热度</td>
                            </tr>
                            {(function (self) {
                                let list = self.state.yanzao.map(function (item, index) {
                                    return <tr key={index}>
                                        <td>{index}</td>
                                        <td>{item.ids}</td>
                                        <td>{item.title}</td>
                                        <td>{item.price}</td>
                                        <td>{item.nums}</td>
                                        <td>{item.hot}</td>
                                    </tr>
                                })
                                return list;
                            })(this)}
                        </table>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-heading"><h2>壁画</h2></div>
                        <table className="table">
                            <tr>
                                <td>序号</td>
                                <td>#</td>
                                <td>商品信息</td>
                                <td>商品单价</td>
                                <td>商品数量</td>
                                <td>热度</td>
                            </tr>
                            {(function (self) {
                                let list = self.state.bihua.map(function (item, index) {
                                    return <tr key={index}>
                                        <td>{index}</td>
                                        <td>{item.ids}</td>
                                        <td>{item.title}</td>
                                        <td>{item.price}</td>
                                        <td>{item.nums}</td>
                                        <td>{item.hot}</td>
                                    </tr>
                                })
                                return list;
                            })(this)}
                        </table>
                    </div>
                </main>
            </div>
        )
    }
}
export default Product;
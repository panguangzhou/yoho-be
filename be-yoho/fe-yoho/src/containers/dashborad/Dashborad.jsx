import React, { Component } from 'react';

import './Dashborad.css'
import axios from 'axios'
class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrs: [],
            priceBool: true,
            numsBool: true,
            hotBool: true,
            popupBox: false,
            goodslist: false,
            //商品ID是否重复状态
            getMore: ''
        }
    }
    findAll() {
        let self = this;
        axios.get('http://localhost:3000/api/findall')
            .then(function (response) {
                console.log(response)
                response.data.map(function (item) {
                    return item.bool = true
                })
                let arrs = self.state.arrs;
                arrs = self.state.arrs.concat(response.data)
                //更改数据状态
                self.setState({
                    arrs
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    //编辑按钮组件
    changeBtn(index) {
        let arrs = this.state.arrs;
        for (let i = 0; i < arrs.length; i++) {
            arrs[i].bool = true;
        }
        arrs[index].bool = false
        this.setState({
            arrs
        })
    }
    //完成按钮组件
    finishBtn(index, event, ) {
        let title;
        let price;
        let nums;
        let hot;
        let ids = this.refs.ids.value;
        //判断是否已经更改过数据
        if (this.refs.title.value === '') {
            title = this.state.arrs[index].title;
        } else {
            title = this.refs.title.value;
        }
        if (this.refs.price.value === '') {
            price = this.state.arrs[index].price;
        } else {
            price = this.refs.price.value;
        }
        if (this.refs.nums.value === '') {
            nums = this.state.arrs[index].nums;
        } else {
            nums = this.refs.nums.value
        }
        if (this.refs.hot.value === '') {
            hot = this.state.arrs[index].hot;
        } else {
            hot = this.refs.hot.value;
        }
        let data = { ids, title, price, nums, hot };
        let self = this;
        //ajax请求
        axios.get('http://localhost:3000/api/upadata', {
            params: {
                data
            }
        })
            .then(function (response) {
                let arrs = self.state.arrs;
                arrs = response.data;
                for (let i = 0; i < arrs.length; i++) {
                    arrs[i].bool = true;
                }
                arrs[index].bool = true
                //更改数据状态
                self.setState({
                    arrs
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    //删除按钮组件
    removeBtn(ids) {
        //提示用户确认删除
        let self = this
        let r = window.confirm('删除数据之后不可恢复，确认删除吗？')
        if (r === true) {
            axios.get('http://localhost:3000/api/delete', {
                params: {
                    ids
                }
            })
                .then(function (response) {
                    let arrs = self.state.arrs;
                    arrs = response.data;
                    for (let i = 0; i < arrs.length; i++) {
                        arrs[i].bool = true;
                    }
                    self.setState({
                        arrs
                    })
                })
                .catch(function (error) { })
        }

    }
    //价格排序
    goPrice() {
        let change = this.state.priceBool;
        let boom = 'price';
        change = !change
        this.setState({
            priceBool: change
        })
        let self = this;
        axios.get('http://localhost:3000/api/sort', {
            params: {
                change,
                boom
            }
        }).then(function (response) {
            let arrs = self.state.arrs;
            arrs = response.data;
            for (let i = 0; i < arrs.length; i++) {
                arrs[i].bool = true;
            }
            self.setState({
                arrs
            })
        })
            .catch(function (error) {
                console.log(error);
            });
    }
    //数量
    goNums() {
        let change = this.state.numsBool;
        let boom = 'nums';
        change = !change
        this.setState({
            numsBool: change
        })
        let self = this;
        axios.get('http://localhost:3000/api/sort', {
            params: {
                change,
                boom
            }
        }).then(function (response) {
            let arrs = self.state.arrs;
            arrs = response.data;
            for (let i = 0; i < arrs.length; i++) {
                arrs[i].bool = true;
            }
            self.setState({
                arrs
            })
        })
            .catch(function (error) {
                console.log(error);
            });
    }
    //热度
    goHot() {
        let change = this.state.hotBool;
        let boom = 'hot';
        change = !change
        this.setState({
            hotBool: change
        })
        let self = this;
        axios.get('http://localhost:3000/api/sort', {
            params: {
                change,
                boom
            }
        }).then(function (response) {
            let arrs = self.state.arrs;
            arrs = response.data;
            for (let i = 0; i < arrs.length; i++) {
                arrs[i].bool = true;
            }
            self.setState({
                arrs
            })
        })
            .catch(function (error) {
                console.log(error);
            });
    }
    //关闭窗口
    close() {
        let change = this.state.popupBox;
        change = !change
        this.setState({
            popupBox: change
        })
        window.close();
    }
    //点击取消按钮改变关闭弹窗的状态
    cancel() {
        let change = this.state.popupBox;
        change = !change
        this.setState({
            popupBox: change
        })
    }
    //添加更多的商品
    goodsMore() {
        let change = this.state.goodslist;
        change = !change
        this.setState({
            goodslist: change
        })
    }
    //取消添加更多商品
    nogoodsMore() {
        let change = this.state.goodslist;
        change = !change
        this.setState({
            goodslist: change
        })
    }
    //鼠标抬起的时候检测有没有该商品
    getMoreKeyUp() {
        let self = this;
        let idsMore = this.refs.idsMore.value;
        if (idsMore !== '') {
            axios.get('http://localhost:3000/api/check', {
                params: {
                    idsMore
                }
            })
                .then(function (response) {
                    if (response.data == 'yes') {
                        let getMore = self.state.getMore;
                        getMore = 'yes';
                        self.setState({
                            getMore
                        })
                    } else {
                        alert('商品ID重复,请检查之后再输入');
                        self.refs.idsMore.value = null;
                        self.refs.idsMore.focus();
                        return false;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
    //点击确定添加更多的商品
    getMore() {
        //先获取商品ID状态
        let stateId = this.state.getMore;
        let self = this;
        let idsMore;
        let numsMore;
        let nameMore;
        let titleMore;
        let priceMore;
        let imgMore;
        if (stateId == 'yes') {
            idsMore = this.refs.idsMore.value;
            if (this.refs.numsMore.value !== null) {
                numsMore = this.refs.numsMore.value;
                if (this.refs.nameMore.value !== null) {
                    nameMore = this.refs.nameMore.value;
                    if (this.refs.titleMore.value !== null) {
                        titleMore = this.refs.titleMore.value;
                        if (this.refs.priceMore.value !== null) {
                            priceMore = this.refs.priceMore.value
                            if (this.refs.imgMore.value !== null) {
                                imgMore = this.refs.imgMore.value;
                                let data = { idsMore, numsMore, nameMore, titleMore, priceMore, imgMore }
                                axios.get('http://localhost:3000/api/insert', {
                                    params: {
                                        data
                                    }
                                })
                                    .then(function (response) {
                                        let arrs = self.state.arrs;
                                        arrs = response.data;
                                        for (let i = 0; i < arrs.length; i++) {
                                            arrs[i].bool = true;
                                        }
                                        self.setState({
                                            arrs
                                        })
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                    });
                                let change = this.state.goodslist;
                                change = !change
                                this.setState({
                                    goodslist: change
                                })
                            }
                        }
                    }
                }
            }
        }
    }
    //生命周期
    componentDidMount() {
        this.findAll();
    }
    render() {
        return (
            <div>
                <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                    <h2>商品信息</h2>
                    <div className="table-responsive">
                        <table className="table table-striped table-sm">
                            <thead>
                                <tr>
                                    <th><button type="button" className="btn btn-default" >ids</button></th>
                                    <th><button type="button" className="btn btn-default">名称</button></th>
                                    <th><button type="button" className="btn btn-default" onClick={this.goPrice.bind(this)}>单价</button></th>
                                    <th><button type="button" className="btn btn-default" onClick={this.goNums.bind(this)}>数量</button></th>
                                    <th><button type="button" className="btn btn-default" onClick={this.goHot.bind(this)}>热度</button></th>
                                    <th><button type="button" className="btn btn-success" onClick={this.goodsMore.bind(this)}>添加</button></th>
                                    <th><button type="button" className="btn btn-danger" onClick={this.close.bind(this)}>关闭</button></th>
                                </tr>
                            </thead>
                            <tbody>
                                {(function (self, e) {
                                    let list = self.state.arrs.map((item, index) => {
                                        return (<tr key={index}>
                                            <td>{item.bool ? item.ids : <div className="input-group" disabled="disabled"><input ref='ids' type='text' className="form-control" value={item.ids} aria-describedby="sizing-addon" /></div>}</td>
                                            <td>{item.bool ? item.title : <div className="input-group"><input ref='title' type='text' className="form-control" placeholder={item.title} aria-describedby="sizing-addon" /></div>}
                                            </td>
                                            <td>{item.bool ? item.price : <div className="input-group"><input ref='price' type='text' className="form-control" placeholder={item.price} aria-describedby="sizing-addon" /></div>}
                                            </td>
                                            <td>{item.bool ? item.nums : <div className="input-group"><input ref='nums' type='text' className="form-control" placeholder={item.nums} aria-describedby="sizing-addon4" /></div>}
                                            </td>
                                            <td>{item.bool ? item.hot : <div className="input-group"><input ref='hot' type='text' className="form-control" placeholder={item.hot} aria-describedby="sizing-addon" /></div>}</td>
                                            <td><button type="button" className="btn btn-default" onClick={self.changeBtn.bind(this, index)}>编辑</button></td>
                                            {item.bool ? <td><button type="button" className="btn btn-default" onClick={self.removeBtn.bind(this, item.ids)}>删除</button></td> :
                                                <td><button type="button" className="btn btn-success" onClick={self.finishBtn.bind(this, index)}>完成</button></td>}
                                        </tr>)
                                    })
                                    return list;
                                }.bind(this))(this)}

                            </tbody>
                        </table>
                    </div>
                    {/* 页面弹出层 */}
                    {this.state.popupBox ? <div className="popupBox">
                        <h3>警告</h3>
                        <p>你确认要关闭吗？</p>
                        <div className="checkbox">
                            <label htmlFor="">
                                <input type="checkbox" />记住我的选择
                            </label>
                        </div>
                        <div className="fl">
                            <button type="button" className="btn btn-default" onClick={window.close()}>确认</button>
                        </div>
                        <div className="fr">
                            <button type="button" className="btn btn-danger" onClick={this.cancel.bind(this)}>取消</button>
                        </div>
                    </div> : ''}
                    {/* 添加商品信息 */}
                    {this.state.goodslist ? <div className='goodslist'>
                        <h2>添加商品</h2>
                        <div className="input-group">
                            <span className="input-group-addon" id="basic-addon3">商品ID</span>
                            <input type="text" className="form-control" placeholder="商品ID" aria-describedby="basic-addon1" ref='idsMore' onBlur={this.getMoreKeyUp.bind(this)} />
                        </div>
                        <div className="input-group">
                            <span className="input-group-addon" id="basic-addon3">商品数量</span>
                            <input type="text" className="form-control" placeholder="商品数量" aria-describedby="basic-addon1" ref='numsMore' />
                        </div>
                        <div className="input-group">
                            <span className="input-group-addon" id="basic-addon3">商品类别</span>
                            <input type="text" className="form-control" placeholder="商品类别" aria-describedby="basic-addon1" ref='nameMore' />
                        </div>
                        <div className="input-group">
                            <span className="input-group-addon" id="basic-addon3">商品信息</span>
                            <input type="text" className="form-control" placeholder="商品信息" aria-describedby="basic-addon1" ref='titleMore' />
                        </div>
                        <div className="input-group">
                            <span className="input-group-addon" id="basic-addon3">商品单价</span>
                            <input type="text" className="form-control" placeholder="商品单价" aria-describedby="basic-addon1" ref='priceMore' />
                        </div>
                        <div className="input-group">
                            <span className="input-group-addon" id="basic-addon3">图片链接地址</span>
                            <input type="text" className="form-control" placeholder="图片链接地址" aria-describedby="basic-addon1" ref='imgMore' />
                        </div>
                        <div className="fl">
                            <button type="button" className="btn btn-default" onClick={this.getMore.bind(this)}>确认</button>
                        </div>
                        <div className="fr">
                            <button type="button" className="btn btn-danger" onClick={this.nogoodsMore.bind(this)}>取消</button>
                        </div>
                    </div> : ''}
                </main>
            </div>
        );
    }
}

export default Orders;

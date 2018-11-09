import React, { Component } from 'react';
import axios from 'axios'
class Ordarde extends Component {
  constructor(props){
    super(props);
    this.state={
        all:[]
    }
  }
  all(){
    let self =this;
    let data = this.refs.all.value;
    axios.get('http://localhost:3000/api/all',{
      params:{
        data
      }
    })
    .then(function(response){
      let all = self.state.all;
      all=response.data;
      console.log(all)
      self.setState({
        all
      })
    })
    .catch(function(error){
      console.log(error)
    })
  }
  render() {
    return (
      <div>
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="商品名称" aria-describedby="basic-addon2" ref='all'onKeyUp={this.all.bind(this)}/>
            <button type="button" className="btn btn-default" onKeyUp={this.all.bind(this)}>搜索</button>
          </div>
          <table className="table">
            <tr>
              <td>#</td>
              <td>商品信息</td>
              <td>商品单价</td>
              <td>商品数量</td>
              <td>热度</td>
            </tr>
            {(function(self){
              let list = self.state.all.map(function(item){
                  return <tr>
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
        </main>
      </div>
    );
  }
}

export default Ordarde;

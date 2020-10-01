import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TableOfContext from './Components/tableodcontext';
import Subject from './Components/Subject';
import Content from './Components/Content';


class App extends Component {
  constructor(props) {//render전에 state값 초기화
    super(props);
    this.state = {
      mode: 'read',
      selected_content_id : 2,
      subject: { title: 'WEB', sub: 'world wide web!' },
      welcome: { title: 'Welcome', desc: 'Hello, React!' },
      contents: [
        { id: 1, title: 'HTML', desc: 'HTML is hyper...' },
        { id: 2, title: 'CSS', desc: 'CSS is design...' },
        { id: 3, title: 'JavaScript', desc: 'JavaScript is ...' },
      ]
    }
    //App, 상위 컴포넌트에서 Subject, 하위 컴포넌트로 전달
  }

  render() {//어떤 HTML을 만드는 가를 담당
    var _title, _desc = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    } else if (this.state.mode === 'read') {
      var i = 0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id){
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i++;
      }
    }
    return (
      <div className="App">
        <Subject 
        title={this.state.subject.title} 
        sub={this.state.subject.sub}
        onChangePage = {function (){
          this.setState(
            {mode:'welcome'}
          );
        }.bind(this)}></Subject>
        <TableOfContext 
        data={this.state.contents}
        onChangePage = {function(id){
          this.setState({
            mode:'read',
            selected_content_id: Number(id),
          });
        }.bind(this)}
        ></TableOfContext>
        <Content title={_title} desc={_desc}></Content>
      </div>
    );
  }
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import {Col, Row, Panel, } from "react-bootstrap";


export class AboutUs extends React.Component {
  render(){
    return (
      <Row>
      <Col md={12} >

      <Col md={6} mdOffset={1}>
      <Row>
      <h3> BN5x 树形笔记 </h3>
      <div>
        <p>灵活的树形笔记管理</p>
        <p>GTD系统</p>
        <p>Kanban</p>
        <p> 后端基于Wilddog</p>
        <p>前端基于Redux+React</p>
        <p><a href="https://github.com/isnoth/BN5x">项目页面 https://github.com/isnoth/BN5x </a></p>

      </div>
      </Row>

      <Row>
      <h4>联系邮件</h4>
      <p>isnoth <a href="mailto: isnothe@gmail.com">&lt;isnothe@gmail.com&gt;</a> </p>
       <p> 总算把这个发布出来了，也算给自己有一个交代。</p>
       <p> 断断续续开发近一年，经常只是下班后干个一个小时半个小时。</p>
       <p> 作为自己GTD系统的一份子，我觉得挺对的住这么多Coding的时间的。</p>
       <p> 感谢Boogunote 项目的灵感。希望对大家有一些用处。</p>
      </Row>
      </Col>

      <Col md={5} >
       <h3>更新日志</h3>
       <div>
        <h4> 2016-12-04:</h4>
         <li > 支持flat布局冻结(D) </li>
         <li > 增加节点拖拽功能(D) </li>
       </div>
       <div>
        <h4> 2016-11-21:</h4>
         <li > alpha 发布</li>
       </div>
      </Col>

      </Col>
      </Row>
    )
  }
}

export default AboutUs 

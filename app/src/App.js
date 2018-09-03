import React, { Component } from 'react';
import './App.css';
 
import Table from './Table';
import TimeInput from './TimeInput';
import {  Row, Col, Tree, Collapse ,Input, Button ,InputNumber,Layout   } from 'antd';

import moment from 'moment';
const { Header, Content, Footer, Sider } = Layout;
//import datajson from './data.js ';
 
var fs = require('fs');
 
 const TreeNode = Tree.TreeNode;


var Panel=Collapse.Panel;
 
class App extends Component {
  constructor(props) {
    super(props);
  }
  titles={
  "Network":"网络质量",  
  "Network_DelayedTime":"时延",
  'Network_LostRate':"丢包率",
  "Network_LostRate_Up":"上行丢包率",
  "Network_LostRate_Down":"下行丢包率",
  "Up":"上行质量监测",
  "BitRate_Up_Total":"上行总码率",
  "BitRate_Up_Video":"上行视频（大画面）码率",
  "BitRate_Up_Audio":"上行音频码率",
  "BitRate_Up_By":"上行辅路视频码率",
  "FrameRate_Up":"上行帧率",
  "FrameRate_Up_Video":"上行视频（大画面）帧率",
  "FrameRate_Up_By":"上行辅路帧率",
  "Down":"下行质量监测",
  "BitRate_Down_Total":"下行总码率",
  "BitRate_Down_Video":"下行视频（大画面）总码率",
  "BitRate_Down_Audio":"下行音频码率",
  "BitRate_Down_By":"下行辅路视频码率",
  "FrameRate_Down":"下行帧率",
  "FrameRate_Down_Video":"下行视频（大画面）帧率",
  "FrameRate_Down_By":"下行辅路帧率",
  "CPU":"设备环境",
  "CPU_Total":"设备CPU占用率",
  "CPU_App":"应用CPU占用率"
  };
  checked=[];
  state = {
    treeData: [
      {
        title: '网络质量',
        key: 'Network',
        checkable: false,
        children: [{
          title: '时延',
          key: 'Network_DelayedTime',

        }, {
          title: '丢包率',
          key: 'Network_LostRate',
          children:[
            {
              title:"上行丢包率",
              key:"Network_LostRate_Up",
              checkable: true,
            },
            {
              title:"下行丢包率",
              key:"Network_LostRate_Down",
              checkable: true,
            }
          ]
        }]
      },
      {
        title: '上行质量监测',
        key: 'Up',
        checkable: false,
        children: [{
          title: '上行总码率',
          key: 'BitRate_Up_Total',
          children: [
            {
              title: "上行视频（大画面）码率",
              key: 'BitRate_Up_Video',
              checkable: true,

            }, {
              title: "上行音频码率",
              key: 'BitRate_Up_Audio',
              checkable: true,

            }
            , {
              title: "上行辅路视频码率",
              key: 'BitRate_Up_By',
              checkable: true,

            }
          ]
        }, {
          title: '上行帧率',
          key: 'FrameRate_Up',
          checkable: false,

          children: [
            {
              title: "上行视频（大画面）帧率",
              key: "FrameRate_Up_Video",
              checkable: true,
            },
            {
              title: "上行辅路帧率",
              key: "FrameRate_Up_By",
              checkable: true,
            }
          ]
        }]
      },
       {
        title: '下行质量监测',
        key: 'Down',
        checkable: false,
        children: [{
          title: '下行总码率',
          key: 'BitRate_Down_Total',
          children: [
            {
              title: "下行视频（大画面）总码率",
              key: 'BitRate_Down_Video',
              checkable: true,
              children: [],
            }, {
              title: "下行音频码率",
              key: 'BitRate_Down_Audio',
              checkable: true,

            }
            , {
              title: "下行辅路视频码率",
              key: 'BitRate_Down_By',
              checkable: true,

            }
          ]
        }, {
          title: '下行帧率',
          key: 'FrameRate_Down',
          checkable: false,
          children: [
            {
              title: "下行视频（大画面）帧率",
              key: "FrameRate_Down_Video",
              checkable: true,
            },
            {
              title: "下行辅路帧率",
              key: "FrameRate_Down_By",
              checkable: true,
            }
          ]
        }]
      },
      {
        title: '设备环境',
        key: 'CPU',
        checkable: false,
        children: [{
          title: '设备CPU占用率',
          key: 'CPU_Total',

        }, {
          title: '应用CPU占用率',
          key: 'CPU_App',

        }]
      }],
    
    collapsed: false,
   // checked: [],//选中的目录项->会显示的图表
    lastSeleted: "",//上次选中的跳转目录
    dimensions:[
      "Network_DelayedTime",
      "Network_LostRate_Up",
      "Network_LostRate_Down",
      "BitRate_Up_Total",
      "BitRate_Up_Video",
      "BitRate_Up_Audio",
      "BitRate_Up_By",
      "FrameRate_Up_Video",
      "FrameRate_Up_By",
      "BitRate_Down_Total",
      "BitRate_Down_Video",
      "BitRate_Down_Audio",
      "BitRate_Down_By",
      "FrameRate_Down_Video",
      "FrameRate_Down_By",
      "CPU_Total",
      "CPU_App"
    ],
    data:{
      "time":[],
      "Network_DelayedTime":[ ],
      "Network_LostRate_Up":[ ],
      "Network_LostRate_Down":[ ],
      "BitRate_Up_Total":[ ],
      "BitRate_Up_Video":[ ],
      "BitRate_Up_Audio":[ ],
      "BitRate_Up_By":[ ],
      "FrameRate_Up_Video":[ ],
      "FrameRate_Up_By":[ ],
      "BitRate_Down_Total":[ ],
      "BitRate_Down_Video":[ ],
      "BitRate_Down_Audio":[ ],
      "BitRate_Down_Big":[],
      "BitRate_Down_By":[ ],
      "FrameRate_Down_Video":[ ],
      "FrameRate_Down_By":[ ],
      "CPU_Total":[ ],
      "CPU_App":[ ]
      
    }
    ,
    visible: false
  }
  time=[];
  appId=1400027849;
  userId="chentest";
  componentWillMount() {
    this.appId=1400027849;
    this.userId="chentest";
    this.appId=parseInt( localStorage.getItem("appId"));
    this.userId=localStorage.getItem("userId");
    console.log(localStorage, this.state);
  }
   /***初始化***/
  componentDidMount(){
    var refss=this.refs;
    var titles=this.titles;
 
    var fun = function (str) {
      for (var s in  titles) {
        if ( titles[s] == str) {
          return s;
        }
      }
    }
    
   
   
   /* function selectkeyintree(str,tree){
       for(var child in tree.props.children){
         if(tree.props.children[child].key==str){
          return tree.props.children[child];
        }
        else{
          return  selectkeyintree(str,tree.props.children[child]);
        }
      }
    }
    for(var it in this.refs){
      if(it!="treemenu"&& it !="top"){
        
         this.refs[it].state.myChart.on("legendselectchanged",function (params) 
         {
           // 获取点击图例的选中状态
           var isSelected = params.selected[params.name];
           // 在控制台中打印
           console.log((isSelected ? '选中了' : '取消选中了') + '图例' + params.name);
           // 打印所有图例的状态 
           if (isSelected) {
              console.log(selectkeyintree(fun(params.name),refss["treemenu"]) );
            var keys=refss["treemenu"].props.checkedKeys;
           if(keys!=undefined &&keys!=null) 
              keys.push(fun(params.name));
            console.log(refss["treemenu"] ,keys); 
             
            refss["treemenu"].defaultCheckedKeys=keys;
            }
           else {

           }
      });
      }
    }*/
     
    window.onresize = function () {
       for (var item in refss) {
          if(item=="treemenu"||item=="top"){     
          }
        else{
          refss[item].state.myChart.resize();//TODO:自适应偏慢
          }   
        }
        document.getElementById("scrollview").style.height=""+(window.innerHeight-56)+"px";
        document.getElementById("scrollmenu").style.height=""+(window.innerHeight-56)+"px";
  
      }
     
  }
   
  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
         return (
          <TreeNode title={item.title} key={item.key} dataRef={item}  
          disableCheckbox={item.checkable} selectable={true} style={{fontSize:12,padding:0,margin:0 }}  >
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode  disableCheckbox={item.checkable} style={{fontSize:12 }} {...item} />;
    });
  }
  renderMutibleScreens(data){//TODO:多路下行视频，需要动态添加到tree里  
    var item;
    var i=0;
    for( item in this.state.treeData){
      i=0;
      if(item.title=="下行视频（大画面）码率"){
        for(it in data){
          item.children.push({title:"下行视频"+i+"（大画面）码率",
                key:"2-0-0"+i});
        i++;
        }
       }
       i=0;
       if(item.title=="下行视频（大画面）帧率"){
        for(it in data){
          item.children.push({title:"下行视频"+i+"（大画面）帧率",
                key:"2-0-1"+i});
        i++;
        }
       }
    }
  }
  /***交互控制逻辑***/

  //折叠面板-用于收起图表
  onCollapse = (collapsed) => {
     this.setState({ collapsed });
  }
   
  //树目录选择和多选
  onSelect = (selectedKeys, info) => {
    let selectedkey = selectedKeys[0];
    let anchorElement = document.getElementById(this.key2table(selectedkey));
     
    let scrollParent = document.getElementById("scrollview");
     if (anchorElement) {
      //scrollParent.scrollTop=anchorElement.offsetTop;// 方法1
      // anchorElement.scrollIntoView();// 方法2
      scrollParent.scrollTo({ top: anchorElement.offsetTop, behavior: "smooth" });//方法3
       
    }
    window.location.hash=this.key2table(selectedkey);
  }

//树目录多选，由于从tooltip到树多选框的状态同步难以实现（多选框状态不知道怎么改）加之tooltip可以控制显示隐藏，暂且取消这个功能
  onCheck = (checkedKeys, info) => {
    let difference = checkedKeys.checked.concat(this.checked).filter(v => !checkedKeys.checked.includes(v) || !this.checked.includes(v))
    if(difference.length>0){
       var key = this.key2table(difference[0]);
      if (this.checked.length > checkedKeys.checked.length) {
         this.refs[key].subDimension(this.key2title(difference[0]));
      }
      else if (this.checked.length < checkedKeys.checked.length) {
         this.refs[key].addDimension(this.key2title(difference[0]));
    }
  }
     this.checked=checkedKeys.checked ;
  }
 
  //输入组件
  setTime(value) {
    this.time=value;
  }
  setAppId(value) {
   // this.setState({ appId: value });
   this.appId=value;
    localStorage.setItem("appId",value);
     
  }
  setUserId = (e) => {
  //  this.setState({userId: e.target.value });
    this.userId=e.target.value;
    localStorage.setItem("userId",e.target.value);
  }
/***请求数据***/
  getInput(callBackFunc) {
    var url = "http://avq.avc.qcloud.com/query/Show_Data?sdkAppId=" + this.appId
      + "&account=" + this.userId
      + "&isUseImSdk=" + 1 + "&isQcloud=" + 0
      + "&beginTime=" + this.time[0].format("YYYY-MM-DD+HH:mm:ss").replace(/:/g, "%3A")
      + "&endTime=" + this.time[1].format("YYYY-MM-DD+HH:mm:ss").replace(/:/g, "%3A")
      ;
      var ret={};
    fetch(url,
      {
        "credentials": "include",
        "headers": {},
        "referrer": "http://avq.avc.qcloud.com/monitor.html",
        "referrerPolicy": "no-referrer-when-downgrade",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "Accept": "application/json, text/javascript"
      }) .then(function(response) {
        ret=response.json();
        //console.log(ret);
        return ret;
      }).then(function(data) {    
        ret=data;   
        callBackFunc(ret);
        });

 }
        //发送请求回调函数，数据解析
        callBackFunc(data) {
          console.log(data);
          if (data["retCode"] == -1) {
            window.href = "http://avq.avc.qcloud.com/monitor.html";
            return;
          }
          if (data["retCode"] != 0) {
            alert(data["errMsg"]);
            return;
          }

          var infoAlloc = [];
          var enterAbility = [];

          var downUdtLostRates = [];
          var upLostRates = [];
          var udtUpLostRates = [];

          var strEnterAbility = [];
          var strInfoAlloc = [];

          var strDownPacketCount = [];
          var strDownUdtPacketCount = [];

          var strUpPacketCount = [];
          var strUdtUpPacketCount = [];
          var downLostRateMap = [];
          var basicInfo;

          alert(data["downLostData"].length);
          if (data["downLostData"] != undefined && data["downLostData"].length > 0) {
            basicInfo = data["downLostData"][0];

          } else if (data["downBinLostData"] != undefined && data["downBinLostData"].length > 0) {
            basicInfo = data["downBinLostData"][0];

          }

          function invertUTC2Local(msec) {
            var timeDiffOfUTC = 0; // (new Date()).getTimezoneOffset() * 60000;

            var time = moment(msec - timeDiffOfUTC);
            console.log(timeDiffOfUTC, msec, time);
            return time.format("hh:mm:ss");

          }
          data["infoAlloc"].forEach((value) => {
            var serverTime = invertUTC2Local(value["serverTime"]);
            infoAlloc.push([serverTime, 50]);
            strInfoAlloc[serverTime] = value["strInfoAlloc"];
          });
          var preServerTime = 0;
          var tempdata = this.state.data;
          for (var item in this.state.data) {
            tempdata[item] = [];
          }

          data["downLostData"].forEach((value) => {

            var serverTime = invertUTC2Local(value["serverTime"]);
            if (preServerTime != 0) {
              for (; serverTime - preServerTime > 7000;) {
                preServerTime += 2000;
                tempdata["time"].push(preServerTime);
                tempdata["BitRate_Up_Total"].push(0);
                tempdata["Network_LostRate_Down"].push(0);
                tempdata["BitRate_Down_Total"].push(0);
                tempdata["Network_DelayedTime"].push(0);
                downUdtLostRates.push([preServerTime, 0]);
                udtUpLostRates.push([preServerTime, 0]);
                tempdata["FrameRate_Up_Video"].push(0);
                tempdata["BitRate_Up_Video"].push(0);
                tempdata["FrameRate_Up_By"].push(0);
                tempdata["BitRate_Up_By"].push(0);
                tempdata["BitRate_Up_Audio"].push(0);
                tempdata["BitRate_Down_Video"].push(0);
                tempdata["FrameRate_Down_Video"].push(0);
                tempdata["BitRate_Down_Big"].push(0);
                tempdata["FrameRate_Down_By"].push(0);
                tempdata["BitRate_Down_By"].push(0);
                tempdata["BitRate_Down_Audio"].push(0);
                tempdata["CPU_App"].push(0);
                tempdata["CPU_Total"].push(0);

                strDownPacketCount[preServerTime] = "应收包数：" + 0 + "<br>" + "实收包数：" + 0;
                strDownUdtPacketCount[preServerTime] = "应收包数：" + 0 + "<br>" + "实收包数：" + 0;
                strUdtUpPacketCount[preServerTime] = "应收包数：" + 0 + "<br>" + "实收包数：" + 0;
              }
            }
            preServerTime = serverTime;
            tempdata["time"].push(serverTime);
            downUdtLostRates.push([serverTime, value["downUdtLostRate"]]);
            udtUpLostRates.push([serverTime, value["udtUpLostRate"]]);

            tempdata["BitRate_Up_Total"].push(value["upBitRate"]);

            tempdata["Network_LostRate_Down"].push(value["downLostRate"]);
            tempdata["BitRate_Down_Total"].push(value["downBitRate"]);
            downLostRateMap[serverTime / 1000] = value;
            tempdata["Network_DelayedTime"].push(value["delay"]);
            tempdata["FrameRate_Up_Video"].push(value["upBigFrameRate"]);
            tempdata["BitRate_Up_Video"].push(value["upBigBitRate"]);
            tempdata["FrameRate_Up_By"].push(value["upSubViewFrameRate"]);
            tempdata["BitRate_Up_By"].push(value["upSubViewBitRate"]);
            tempdata["BitRate_Up_Audio"].push(value["upAudioBitRate"]);

            tempdata["BitRate_Down_Video"].push(value["downVideoBitRate"]);
            tempdata["FrameRate_Down_Video"].push(value["downBigFrameRate"]);
            tempdata["BitRate_Down_Big"].push(value["downBigBitRate"]);
            tempdata["FrameRate_Down_By"].push(value["downSubViewFrameRate"]);
            tempdata["BitRate_Down_By"].push(value["downSubViewBitRate"]);
            tempdata["BitRate_Down_Audio"].push(value["downAudioBitRate"]);

            tempdata["CPU_App"].push(value["appCpuUsage"]);
            tempdata["CPU_Total"].push(value["totalCpuUsage"]);

            strDownPacketCount[serverTime] = "应收包数：" + value["downTotalNum"] + "<br>" + "实收包数：" + value["downRealNum"];
            strDownUdtPacketCount[serverTime] = "UDT应收包数：" + value["downUdtTotalNum"] + "<br>" + "UDT实收包数：" + value["downUdtRealNum"];
            strUdtUpPacketCount[serverTime] = "应收包数：" + value["udtUpTotalNum"] + "<br>" + "实收包数：" + value["udtUpRealNum"];
          });


          preServerTime = 0;
          data["upLostData"].forEach((value) => {
            var serverTime = invertUTC2Local(value["serverTime"]);
            if (preServerTime != 0) {
              for (; serverTime - preServerTime > 10000;) {
                preServerTime += 5000;
                tempdata["Network_LostRate_Up"].push(0);
                strUpPacketCount[preServerTime] = "应收包数：" + 0 + "<br>" + "实收包数：" + 0;
              }
            }
            preServerTime = serverTime;
            tempdata["Network_LostRate_Up"].push(value["upLostRate"]);
            strUpPacketCount[serverTime] = "应收包数：" + value["totalNum"] + "<br>" + "实收包数：" + value["realNum"];
          });

          strEnterAbility = [];
          data["enterRoomAbility"].forEach((value) => {
            var serverTime = invertUTC2Local(value["serverTime"]);
            enterAbility.push([serverTime, 70]);
            strEnterAbility[serverTime] = value;
          });
          data["enterRoomBinAbility"].forEach((value) => {
            var serverTime = invertUTC2Local(value["serverTime"]);
            enterAbility.push([serverTime, 70]);
            strEnterAbility[serverTime] = value["enterRoomAbility"];
          });
          console.log(tempdata);
          this.setState({
            data: tempdata
          });


        }

        //从data到每个图表的data
        getTableData(str) {
          var list = this.table2keys(str);
          var result = {};
          result["time"] = this.state.data["time"];
          for (var it in list) {
            result[this.key2title(list[it])] = this.state.data[list[it]];
          }
          return result;
        }
        search() {
          this.getInput(this.callBackFunc.bind(this));
        }
  /***辅助函数***/
  //key table title之间的相互转换
  key2table(str) {
    var index = str.indexOf("_");
    if (index > 0) {
      index = str.indexOf("_", index + 1);
      if (index > 0) {
        return str.substr(0, index);
      }
      return str;
    }
  }
  table2keys(str) {
    let result = [];
    for (var i in this.state.dimensions) {
      if (this.state.dimensions[i].indexOf(str, 0) >= 0) {
        result.push(this.state.dimensions[i]);
      }
    }
    return result;
  }
  key2title(str) {
    return this.titles[str];
  }
  title2key(str) {
    for (var s in this.titles) {
      if (this.titles[s] == str) {
        return s;
      }
    }
  }
  
  change2selected(name){
   //TODO:子组件调用父组件函数竟然无法引用父组件的state refs??
   
   }
  change2unselected(name){
 
   }
  render() {
    return (
      <div style={{minWidth:720, overflow:"auto", 
      position: "fixed", width:"100%",
      backgroundImage:"url('background.png')",
backgroundRepeat:"repeat-x"}} >
        <Row >  
          <Col   span={24}>
          
            <div id="top"   ref="top"  >
           
              <div  class="topleft" style={{ lineHeight: "32px", fontSize: 24, fontWeight: "bold", fontFamily: "Segoe UI", color: "rgba(20,100,188,1)", }}>AVQ MONITOR</div>

              {/* <div class="iconsright">
                <div id="user" class="icon" style={{
                  backgroundColor: "rgba(100,100,140,0.5)"
                }} />
              </div> */}
              {/* <div class="iconsright">
                <div id="share" class="icon" style={{
                  backgroundColor: "rgba(100,140,100,0.5)"
                }} />
              </div> */}

              <div class="iconsright" style={{ width: 700 }}  >
                <InputNumber defaultValue={this.appId} placeholder="App Id" style={{ width: "15%", marginRight: "1%" }} onChange={this.setAppId.bind(this) }/>
                <Input defaultValue={this.userId}  placeholder="User Id" style={{ width: "15%", marginRight: "1%" }} onChange={ this.setUserId.bind(this) } />
                <TimeInput style={{ float: "right" }} setValue={this.setTime.bind(this)} />
                <Button style={{ float: "right",   }} type="primary" icon="search" 
                  class="icon" onClick={this.search.bind(this)} >
                  Search
                </Button>
              </div>
                  </div>
          </Col>
         
        </Row>
        <Row  style={{display:"flex"}} >
          {/* <Col  xs={{span:12}}  sm={{span:12}} md={{span:8}} lg={{span:6}} xxl={{span:4}} > */}
          <div  id="scrollmenu"   style={{ height: window.innerHeight - 56 , minWidth:320, paddingRight:16, }} >
              <div header="目录"  key="1" class="panel"
                style={{
                   boxShadow: "0px 0px 8px #9999998a", borderRadius: "8px"
                }}>
                <Tree ref="treemenu"
                  // checkable={true} 
                  defaultExpandAll={true} checkStrictly={true}
                  multiple={false}
                   
                  onCheck={this.onCheck}
                   onSelect={this.onSelect} selectedKeys={this.state.selectedKeys}
                  style={{ width: "100%", fontSize: "10px" }}
                >
                  {this.renderTreeNodes(this.state.treeData)}
                </Tree>
              </div>
             </div>
          {/* </Col> */}
          {/* <Col   xs={{span:12}}  sm={{span:12}} md={{span:16}} lg={{span:18}} xxl={{span:20}} > */}
            <div id="scrollview" style={{ paddingTop:8,  height: window.innerHeight - 56,   flexGrow: 1}} >      
              <Collapse bordered={false}
                defaultActiveKey={['1']}
                style={{ boxShadow: "0px 0px 4px #9999998a", borderRadius: "8px" }}>
                <Panel id="Network" style={{ marginTop: 0 }} header="网络质量监测" key="1"    >
                  <Table id="Network_DelayedTime" ref="Network_DelayedTime" title={this.key2title("Network_DelayedTime")}
                    data={this.getTableData("Network_DelayedTime")}
                    change2selected={this.change2selected}
                    change2unselected={this.change2unselected} />
                  <Table id="Network_LostRate" ref="Network_LostRate" title={this.key2title("Network_LostRate")}
                    data={this.getTableData("Network_LostRate")}
                    change2selected={this.change2selected}
                    change2unselected={this.change2unselected} />
                </Panel>
              </Collapse>
              <Collapse bordered={false}
                defaultActiveKey={['1']}
                style={{ boxShadow: "0px 0px 8px #9999998a", borderRadius: "8px" }}>
                <Panel id="Up" header="上行质量监测" key="1"    >
                  <Table id="BitRate_Up" ref="BitRate_Up" title={this.key2title("BitRate_Up")} data={this.getTableData("BitRate_Up")}
                    change2selected={this.change2selected}
                    change2unselected={this.change2unselected} />
                  <Table id="FrameRate_Up" ref="FrameRate_Up" title={this.key2title("FrameRate_Up")} data={this.getTableData("FrameRate_Up")}
                    change2selected={this.change2selected}
                    change2unselected={this.change2unselected} />
                </Panel>
              </Collapse>
              <Collapse bordered={false}
                defaultActiveKey={['1']} style={{ boxShadow: "0px 0px 8px #9999998a", borderRadius: "8px" }}>
                <Panel id="Down" header="下行质量监测" key="1"    >
                  <Table id="BitRate_Down" ref="BitRate_Down" title={this.key2title("BitRate_Down")} data={this.getTableData("BitRate_Down")}
                    change2selected={this.change2selected}
                    change2unselected={this.change2unselected} />
                  <Table id="FrameRate_Down" ref="FrameRate_Down" title={this.key2title("FrameRate_Down")} data={this.getTableData("FrameRate_Down")}
                    change2selected={this.change2selected}
                    change2unselected={this.change2unselected} />
                </Panel>
              </Collapse>
              <Collapse bordered={false}
                defaultActiveKey={['1']} style={{ boxShadow: "0px 0px 8px #9999998a", borderRadius: "8px" }}>
                <Panel id="CPU" header="设备环境监测" key="1"    >
                  <Table id="CPU_Total" ref="CPU_Total" title={this.key2title("CPU_Total")} data={this.getTableData("CPU_Total")}
                    change2selected={this.change2selected}
                    change2unselected={this.change2unselected} />
                  <Table id="CPU_App" ref="CPU_App" title={this.key2title("CPU_App")} data={this.getTableData("CPU_App")}
                    change2selected={this.change2selected}
                    change2unselected={this.change2unselected} />
                </Panel>
              </Collapse>
            </div>
          {/* </Col> */}

        </Row>

      </div>
    );
         }
       }
       
       export default App;

import React, { Component } from 'react';
import './App.css';
 
import Table from './Table';
import TimeInput from './TimeInput';
import { Layout, Menu, Row, Col, Tree, Collapse ,Input, Button ,InputNumber   } from 'antd';
import TextArea from '../../node_modules/antd/lib/input/TextArea';
 const TreeNode = Tree.TreeNode;

var echarts = require('echarts');

const Panel = Collapse.Panel;
function getCookie(cname)
{
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) 
  {
    var c = ca[i].trim();
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
  return "";
}
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
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
  
  state = {
    treeData: [
      {
        title: '网络质量',
        key: 'Network',
        checkable: true,
        children: [{
          title: '时延',
          key: 'Network_DelayedTime',

        }, {
          title: '丢包率',
          key: 'Network_LostRate',
          children:[
            {
              title:"上行丢包率",
              key:"Network_LostRate_Up"
            },
            {
              title:"下行丢包率",
              key:"Network_LostRate_Down"
            }
          ]
        }]
      },
      {
        title: '上行质量监测',
        key: 'Up',
        checkable: true,
        children: [{
          title: '上行总码率',
          key: 'BitRate_Up_Total',
          children: [
            {
              title: "上行视频（大画面）码率",
              key: 'BitRate_Up_Video',

            }, {
              title: "上行音频码率",
              key: 'BitRate_Up_Audio',

            }
            , {
              title: "上行辅路视频码率",
              key: 'BitRate_Up_By',

            }
          ]
        }, {
          title: '上行帧率',
          key: 'FrameRate_Up',
          checkable: true,

          children: [
            {
              title: "上行视频（大画面）帧率",
              key: "FrameRate_Up_Video"
            },
            {
              title: "上行辅路帧率",
              key: "FrameRate_Up_By"
            }
          ]
        }]
      },
       {
        title: '下行质量监测',
        key: 'Down',
        checkable: true,
        children: [{
          title: '下行总码率',
          key: 'BitRate_Down_Total',
          children: [
            {
              title: "下行视频（大画面）总码率",
              key: 'BitRate_Down_Video',
              children: [],
            }, {
              title: "下行音频码率",
              key: 'BitRate_Down_Audio',

            }
            , {
              title: "下行辅路视频码率",
              key: 'BitRate_Down_By',

            }
          ]
        }, {
          title: '下行帧率',
          key: 'FrameRate_Down',
          checkable: true,
          children: [
            {
              title: "下行视频（大画面）帧率",
              key: "FrameRate_Down_Video"
            },
            {
              title: "下行辅路帧率",
              key: "FrameRate_Down_By"
            }
          ]
        }]
      },
      {
        title: '设备环境',
        key: 'CPU',
        checkable: true,
        children: [{
          title: '设备CPU占用率',
          key: 'CPU_Total',

        }, {
          title: '应用CPU占用率',
          key: 'CPU_App',

        }]
      }],
    time:null,
    appId:1400027849,
    userId:"chentest1",
    collapsed: false,
    checked: [],//选中的目录项->会显示的图表
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
      "time":[
        1,
        3,
        5,
        7,
        9,
        11,
        13,
        15,
        17,
        19,
        21,
        23,
        25,
        27,
        29,
        31,
        33,
        35,
        37,
        39,
        41,
        43,
        45,
        47,
        49,
        51,
        53,
        55,
        57],
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
      "BitRate_Down_By":[ ],
      "FrameRate_Down_Video":[ ],
      "FrameRate_Down_By":[ ],
      "CPU_Total":[ ],
      "CPU_App":[ ]
    }
  }
  componentWillMount() {
    //初始化sample数据
    for (var i in this.state.data) {
      if (i != "time") {
        for(var j in this.state.data.time){
            this.state.data[i].push(Math.random()*2200);
        }
         
      }
    }
    //注册resize监视函数
    
  }
   
  componentDidMount(){
    var refss=this.refs;
    var titles=this.titles;
    document.cookie="_ga=GA1.2.186138298.1532683988; pgv_pvi=5543704576; qcloud_uid=8af35ef98f2a3bf194e953a6530a1e4f; tencent_uid=556925f6626f40fa70a7677b8e51b556; qcloud_from=qcloud.google.seo-1533131405654; PHPSESSID=89v8duf9q0leaess0aj8vr5nh3; qcloud_visitId=a333a4d801596e7bee4cb1fb450baee7; pgv_si=s527192064; lusername=zt371%40vip.qq.com; loginType=email; lastLoginType=email; uin=o100000483206; tinyid=144115199187172859; skey=qoS29NskGLqAmrlzf5YDE3fSTLgzhrH-v1th8A0nbJg_; appid=1253488539; ownerUin=100000483206"

    var fun = function (str) {
      for (var s in  titles) {
        if ( titles[s] == str) {
          return s;
        }
      }
    }

    function selectkeyintree(str,tree){
      console.log(tree);
      for(var child in tree.props.children){
        console.log(tree.props.children[child]);
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
            // console.log(fun(params.name),params.name,refss["treemenu"],refss["treemenu"].state );
             console.log(selectkeyintree(fun(params.name),refss["treemenu"]) );
            var keys=refss["treemenu"].props.checkedKeys;
            keys.push(fun(params.name));
            console.log(refss["treemenu"] ,keys); 
             
            refss["treemenu"].defaultCheckedKeys=keys;
            //console.log(fun(params.name),params.name,refss["treemenu"],refss["treemenu"].props.checkedKeys  );

           }
           else {

           }
      });

      }
    }
     
    window.onresize = function () {
       for (var item in refss) {
          if(item=="treemenu"||item=="top"){     
          }
        else{
          refss[item].state.myChart.resize();//TODO:自适应偏慢
          }   
        }
        document.getElementById("scrollview").style.height=""+(window.innerHeight-56)+"px";
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
      return <TreeNode style={{fontSize:12 }} {...item} />;
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
  onCollapse = (collapsed) => {
     this.setState({ collapsed });
  }
   
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
  setTime( value){
    this.setState({time:value});   
  }
  setAppId( value){     
    this.setState({appId:value});   
  }
  setUserId=(e) => {
    this.setState({ userId: e.target.value });
  }
  //TODO:组织发送请求
  getInput(){ 
    console.log(this.state );
    var url="http://avq.avc.qcloud.com/query/Show_Data?sdkAppId="+this.state.appId
        +"&account="+this.state.userId
        +"&isUseImSdk="+1+"&isQcloud="+0
        +"&beginTime="+this.state.time[0].format("YYYY-MM-DD+HH:mm:ss").replace(/:/g,"%3A")
        +"&endTime="+ this.state.time[1].format("YYYY-MM-DD+HH:mm:ss").replace(/:/g,"%3A")  
    ;     
    this.search();
    fetch(url,
         {"credentials":"include",
                "headers":{},
                "referrer":"http://avq.avc.qcloud.com/monitor.html",
                "referrerPolicy":"no-referrer-when-downgrade",
                "body":null,
                "method":"GET",
                "mode":"cors",
                "Accept": "application/json, text/javascript" })
    ;               
  }


  search() {
        var sdkAppId=this.state.appId 
        var account=this.state.userId ; 
        var beginTime=this.state.time[0].format("YYYY-MM-DD+HH:mm:ss") ; 
        var endTime=this.state.time[1].format("YYYY-MM-DD+HH:mm:ss") ; 
        var isUseImSdk = 0;
        var isQcloud = 1;
        if(isNaN(sdkAppId) || sdkAppId=="")
        {
            alert("SdkAppId format is wrong!");
            return;
        }
        else if(account=="")
        {
            alert("Must input account!");
            return;
        }
        else if(beginTime=="")
        {
            alert("please input beginTime!");
            return;
        }
        else if(endTime=="")
        {
            alert("please input endTime!");
            return;
        }
     
        if(this.state.time[1].diff(this.state.time[0])> 3600*1000)
        {
            alert("query time can not more than one hours!");
            return;
        }
        
        XMLHttpRequest.ajax({
            type: "GET",
            url: "/query/Show_Data",
            data: { sdkAppId:sdkAppId, account: account, isUseImSdk: isUseImSdk,isQcloud: isQcloud, beginTime: beginTime, endTime: endTime },
            dataType: "json",
            success: function(data) {
                if (data.retCode == -1) { // return;
                    window.confirm('请求接口失败,可能是：<br>1.你可能没有登录; <br />2.没有查看权限，需要腾讯云管理员账号在互动直播控制台登记开发人员QQ号', {
                        btn: ['立即登录', '如何开通权限'], //按钮
                        closeBtn: 0
                    }, function() {
                        // layer.msg('的确很重要', { icon: 1 });
                        window.href = "https://www.qcloud.com/login?s_url=http%3A%2F%2Favq.avc.qcloud.com%2Fmonitor.html";
                    }, function() {
                        // layer.msg('的确很重要', { icon: 1 });
                        window.open("http://avq.avc.qcloud.com/help.html#devinfo");
                    });
                    
                } else {
                  console.log(data);
                    this.callBackFunc(data);
                }
            }
        });  
  } 
  callBackFunc(data) {
    //alert("ajax success");
    if (data["retCode"] == -1) {
        window.href = "http://avq.avc.qcloud.com/monitor.html";
        return;
    }
    if(data["retCode"]!=0)
    {
        alert(data["errMsg"]);
        return;
    }
    var retUin = data["uin"];
    var retStartTimestamp = data["beginTimestamp"];
    var retEndTimestamp = data["endTimestamp"];
    //var downLostRateMap = new Array();
    var infoAlloc=[];
    var enterAbility=[];
    var ctrlAbility=[];
    var videoFreezeCount=[];
    var downLostRates=[];
    var downUdtLostRates=[];
    var upLostRates=[];
    var udtUpLostRates=[];
    var upBitRates=[];
    var downBitRates=[];
    var delays=[];
    var upBigFrameRates=[];
    var upSubViewFrameRates=[];
    var upBigBitRates=[];
    var upSubViewBitRates=[];
    var upAudioBitRates=[];
    var downVideoBitRates=[];
    var downBigFrameRates=[];
    var downBigBitRates=[];
    var downSubViewFrameRates=[];
    var downSubViewBitRates=[];
    var downAudioBitRates=[];
    var appCpuUsages=[];
    var totalCpuUsages=[];
    var strCtrlAbility=[];
    var strEnterAbility=[];
    var strInfoAlloc=[];
    var strVideoFreezeCounts=[];
    var strDownPacketCount=[];
    var strDownUdtPacketCount=[];
    var strDownVideoPacketCount=[];
    var strUpPacketCount=[];
    var strUdtUpPacketCount=[];
    var downLostRateMap = [];

    var basicInfo;
   // alert(data["downLostData"].length);
    if(data["downLostData"]!=undefined && data["downLostData"].length>0)
    {
        basicInfo = data["downLostData"][0];
        //alert(data["downLostData"][0]["sdkAppId"])
    }
    else if(data["downBinLostData"]!=undefined && data["downBinLostData"].length>0)
    {
        basicInfo = data["downBinLostData"][0];
        //alert(data["downLostData"][0]["sdkAppId"])
    }
    else
    {
      /*  $("#bussType").html("");
        $("#sdkAppId").html("");
        $("#roomId").html("");
        $("#groupNum").html("");
        $("#authMode").html("");
        $("#isProxy").html("");
        $("#isTcp").html("");
        $("#transMode").html("");
        $("#clientIp").html("");
        $("#connIp").html("");
        $("#centIp").html("");*/
    }
    function invertUTC2Local(msec)
    {
      var timeDiffOfUTC = (new Date()).getTimezoneOffset() * 60000;
        return (msec - timeDiffOfUTC);
    }
    data["infoAlloc"].forEach((value)=>{
        var serverTime = invertUTC2Local(value["serverTime"]);
        infoAlloc.push([serverTime, 50]);
        strInfoAlloc[serverTime] = value["strInfoAlloc"];
    });

    var preServerTime = 0;
     data["downLostData"].forEach((value)=>{

        var serverTime = invertUTC2Local(value["serverTime"]);
        if(preServerTime != 0)
        {
            for( ; serverTime-preServerTime>7000; )
            {
                preServerTime += 2000;
                upBitRates.push([preServerTime, 0]);
                downLostRates.push([preServerTime, 0]);
                downBitRates.push([preServerTime, 0]);
                delays.push([preServerTime, 0]);
                downUdtLostRates.push([preServerTime, 0]);
                udtUpLostRates.push([preServerTime, 0]);
                upBigFrameRates.push([preServerTime, 0]);
                upBigBitRates.push([preServerTime, 0]);
                upSubViewFrameRates.push([preServerTime, 0]);
                upSubViewBitRates.push([preServerTime, 0]);
                upAudioBitRates.push([preServerTime, 0]);

                downVideoBitRates.push([preServerTime, 0]);
                downBigFrameRates.push([preServerTime, 0]);
                downBigBitRates.push([preServerTime, 0]);
                downSubViewFrameRates.push([preServerTime, 0]);
                downSubViewBitRates.push([preServerTime, 0]);
                downAudioBitRates.push([preServerTime, 0]);

                appCpuUsages.push([preServerTime, 0]);
                totalCpuUsages.push([preServerTime, 0]);

                strDownPacketCount[preServerTime] = "应收包数：" + 0 + "<br>" + "实收包数：" + 0;
                strDownUdtPacketCount[preServerTime] = "应收包数：" + 0 + "<br>" + "实收包数：" + 0;
                strUdtUpPacketCount[preServerTime] = "应收包数：" + 0 + "<br>" + "实收包数：" + 0;
            }
        }
        preServerTime = serverTime;

        downUdtLostRates.push([serverTime, value["downUdtLostRate"]]);
        udtUpLostRates.push([serverTime, value["udtUpLostRate"]]);
        upBitRates.push([serverTime, value["upBitRate"]]);
        downLostRates.push([serverTime, value["downLostRate"]]);
        downBitRates.push([serverTime, value["downBitRate"]]);
        downLostRateMap[serverTime/1000] = value;
        delays.push([serverTime, value["delay"]]);
        upBigFrameRates.push([serverTime, value["upBigFrameRate"]]);
        upBigBitRates.push([serverTime, value["upBigBitRate"]]);
        upSubViewFrameRates.push([serverTime, value["upSubViewFrameRate"]]);
        upSubViewBitRates.push([serverTime, value["upSubViewBitRate"]]);
        upAudioBitRates.push([serverTime, value["upAudioBitRate"]]);

        downVideoBitRates.push([serverTime, value["downVideoBitRate"]]);
        downBigFrameRates.push([serverTime, value["downBigFrameRate"]]);
        downBigBitRates.push([serverTime, value["downBigBitRate"]]);
        downSubViewFrameRates.push([serverTime, value["downSubViewFrameRate"]]);
        downSubViewBitRates.push([serverTime, value["downSubViewBitRate"]]);
        downAudioBitRates.push([serverTime, value["downAudioBitRate"]]);

        appCpuUsages.push([serverTime, value["appCpuUsage"]]);
        totalCpuUsages.push([serverTime, value["totalCpuUsage"]]);

        strDownPacketCount[serverTime] = "应收包数：" + value["downTotalNum"] + "<br>" + "实收包数：" + value["downRealNum"];
        strDownUdtPacketCount[serverTime] = "UDT应收包数：" + value["downUdtTotalNum"] + "<br>" + "UDT实收包数：" + value["downUdtRealNum"];
        strUdtUpPacketCount[serverTime] = "应收包数：" + value["udtUpTotalNum"] + "<br>" + "实收包数：" + value["udtUpRealNum"];
    });


    preServerTime = 0;
     data["upLostData"].forEach((value)=>{
        var serverTime = invertUTC2Local(value["serverTime"]);
        if(preServerTime != 0)
        {
            for( ; serverTime-preServerTime>10000; )
            {
                preServerTime += 5000;
                upLostRates.push([preServerTime, 0]);
                strUpPacketCount[preServerTime] = "应收包数：" + 0 + "<br>" + "实收包数：" + 0;
            }
        }
        preServerTime = serverTime;
        upLostRates.push([serverTime, value["upLostRate"]]);
        strUpPacketCount[serverTime] = "应收包数：" + value["totalNum"] + "<br>" + "实收包数：" + value["realNum"];
    });

    strEnterAbility = [];
     data["enterRoomAbility"].forEach((value)=>{
        var serverTime = invertUTC2Local(value["serverTime"]);
        enterAbility.push([serverTime, 70]);
        strEnterAbility[serverTime] = value;
    });
    data["enterRoomBinAbility"].forEach((value)=>{
        var serverTime = invertUTC2Local(value["serverTime"]);
        enterAbility.push([serverTime, 70]);
        strEnterAbility[serverTime] = value["enterRoomAbility"];
    });
    console.log(upLostRates);
/*
    drawUpLostDataPlot();
    upBitRatePlot = drawTimePlot("#upbitrate", upBitRates, "上行总码率");

    drawDownLostDataPlot();
    downBitRatePlot = drawTimePlot("#downbitrate", downBitRates, "下行总码率");
    delayPlot = drawTimePlot("#delay", delays, "时延");

    appCpuUsagePlot = drawTimePlot("#appcpuusage", appCpuUsages, "应用的cpu使用率");
    totalCpuUsagePlot = drawTimePlot("#totalcpuusage", totalCpuUsages, "设备的cpu使用率");
*/
    if(data["isDownLostDataPb"])
    {
/*
        $("#titleupbigframe").show();
        $("#titleupbigbit").show();
        $("#titleupsubviewframe").show();
        $("#titleupsubviewbit").show();

        $("#titlevideodownbit").show();
        $("#titledownbigframe").show();
        $("#titledownbigbit").show();
        $("#titledownsubviewframe").show();
        $("#titledownsubviewbit").show();


        $("#upbigframeratebox").show();
        $("#upbigbitratebox").show();
        $("#upsubviewframeratebox").show();
        $("#upsubviewbitratebox").show();

        $("#downvideobitratebox").show();
        $("#downbigframeratebox").show();
        $("#downbigbitratebox").show();
        $("#downsubviewframeratebox").show();
        $("#downsubviewbitratebox").show();

        upBigFrameRatesPlot = drawTimePlot("#upbigframerate", upBigFrameRates, "上行大画面帧率");
        upBigBitRatesPlot = drawTimePlot("#upbigbitrate", upBigBitRates, "上行大画面码率");
        upSubViewFrameRatesPlot = drawTimePlot("#upsubviewframerate", upSubViewFrameRates, "上行辅路帧率");
        upSubViewBitRatesPlot = drawTimePlot("#upsubviewbitrate", upSubViewBitRates, "上行辅路码率");
        upAudioBitRatesPlot = drawTimePlot("#upaudiobitrate", upAudioBitRates, "上行音频码率");

        downVideoBitRatePlot = drawTimePlot("#downvideobitrate", downVideoBitRates, "下行视频总码率");
        downBigFrameRatesPlot = drawTimePlot("#downbigframerate", downBigFrameRates, "下行大画面总帧率");
        downBigBitRatesPlot = drawTimePlot("#downbigbitrate", downBigBitRates, "下行大画面总码率");
        downSubViewFrameRatesPlot = drawTimePlot("#downsubviewframerate", downSubViewFrameRates, "下行辅路总帧率");
        downSubViewBitRatesPlot = drawTimePlot("#downsubviewbitrate", downSubViewBitRates, "下行辅路总码率");
        downAudioBitRatesPlot = drawTimePlot("#downaudiobitrate", downAudioBitRates, "下行音频码率");
    
    */  }
    else
    {
      /*  $("#titleupbigframe").hide();
        $("#titleupbigbit").hide();
        $("#titleupsubviewframe").hide();
        $("#titleupsubviewbit").hide();

        $("#titlevideodownbit").hide();
        $("#titledownbigframe").hide();
        $("#titledownbigbit").hide();
        $("#titledownsubviewframe").hide();
        $("#titledownsubviewbit").hide();


        $("#upbigframeratebox").hide();
        $("#upbigbitratebox").hide();
        $("#upsubviewframeratebox").hide();
        $("#upsubviewbitratebox").hide();

        $("#downvideobitratebox").hide();
        $("#downbigframeratebox").hide();
        $("#downbigbitratebox").hide();
        $("#downsubviewframeratebox").hide();
        $("#downsubviewbitratebox").hide();*/
    }

    //$("#searchUin").html(retUin);
    //updateBasicInfo(basicInfo);
}
 
  getTableData(str) {
    var list = this.table2keys(str);
    var result = {};

    result["time"] = this.state.data["time"];
    for (var it in list) {
      result[this.key2title(list[it])] = this.state.data[list[it]];
    }
    return result;
  }

  onSelect = (selectedKeys, info) => {
    let selectedkey = selectedKeys[0];
    let anchorElement = document.getElementById(this.key2table(selectedkey));
    let scrollParent = document.getElementById("scrollview");
    this.setState({ lastSeleted: selectedKeys[0] });
    if (anchorElement) {
      //scrollParent.scrollTop=anchorElement.offsetTop;// 方法1
      // anchorElement.scrollIntoView();// 方法2
      scrollParent.scrollTo({ top: anchorElement.offsetTop, behavior: "smooth" });//方法3

    }
  }

  onCheck = (checkedKeys, info) => {
    let difference = checkedKeys.checked.concat(this.state.checked).filter(v => !checkedKeys.checked.includes(v) || !this.state.checked.includes(v))
    var key = this.key2table(difference[0]);
    if (this.state.checked.length > checkedKeys.checked.length) {
      this.refs[key].subDimension(this.key2title(difference[0]));
    }
    else if (this.state.checked.length < checkedKeys.checked.length) {
      this.refs[key].addDimension(this.key2title(difference[0]));
    }
    this.setState({ checked: checkedKeys.checked });

  }
 
  change2selected(name){
   //TODO:子组件调用父组件函数竟然无法引用父组件的state refs??
   
   }
  change2unselected(name){
    console.log(this  );

   }
  render() {
    return (
      <div style={{ position: "fixed", width: "100%" }}  >
        <Row >
          <Col span={24}    >
            <div id="top" ref="top" class="container "  >
              <div class="topleft" style={{ lineHeight: "28px", fontSize: 24, fontWeight: "bold", fontFamily: "Segoe UI", color: "rgba(20,100,188,1)", }}>AVQ MONITOR</div>

              <div class="iconsright">
                <div id="user" class="icon" style={{
                  backgroundColor: "rgba(100,100,140,0.5)"
                }} />
              </div>
              <div class="iconsright">
                <div id="share" class="icon" style={{
                  backgroundColor: "rgba(100,140,100,0.5)"
                }} />
              </div>

              <div class="iconsright" style={{ width: 700 }}  >
                <InputNumber defaultValue={1400027849} placeholder="App Id" style={{ width: "15%", marginRight: "1%" }} onChange={this.setAppId.bind(this) }/>
                <Input defaultValue={"chentest1"} placeholder="User Id" style={{ width: "15%", marginRight: "1%" }} onChange={ this.setUserId.bind(this) } />
                <TimeInput style={{ float: "right" }} setValue={this.setTime.bind(this)} />
                <Button style={{ float: "right", marginTop: 4 }} type="primary" icon="search" 
                  class="icon" onClick={this.getInput.bind(this)} >
                  Search
                </Button>
              </div>

            </div>

          </Col>
        </Row>
        <Row    >
          <Col span={6}>
            <Collapse
              style={{ margin: 8, marginLeft: 16, marginRight: 16, boxShadow: "0px 0px 8px #9999998a", borderRadius: "8px" }}
              defaultActiveKey={['1']}
              bordered={false}  >
              <Panel header="目录" style={{ margin: 0 }} key="1"  >
                <Tree ref="treemenu"
                  checkable={true} defaultExpandAll={true} checkStrictly={true}
                  multiple={false}
                  onCheck={this.onCheck} checkedKeys={this.state.checked}
                  onSelect={this.onSelect} selectedKeys={this.state.selectedKeys}
                  style={{ width: "100%", fontSize: "10px" }}
                >
                  {this.renderTreeNodes(this.state.treeData)}
                </Tree>
              </Panel>
            </Collapse>

          </Col>
          <Col span={18}  >
            <div id="scrollview" style={{ marginTop: 8, height: window.innerHeight - 56, paddingRight: 4, borderRadius: "8px" }} >
              <Collapse bordered={false}
                defaultActiveKey={['1']}
                style={{ boxShadow: "0px 0px 8px #9999998a", borderRadius: "8px" }}>
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
          </Col>

        </Row>

      </div>
    );
         }
       }
       
       export default App;

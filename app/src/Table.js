 
import React, { Component } from 'react';
import CollapsePanel from '../../node_modules/antd/lib/collapse/CollapsePanel';
import { Row, Col, InputNumber, Form  } from '../../node_modules/antd';
import { Select,Modal,Icon  } from 'antd';
import CollectionCreateForm  from './RulesInput.js'


var sampleWarningRule=[{name:"上限",threshold:0,use:true,total:0},
{name:"下限",threshold:0,use:false,total:0},
{name:"波动阈值",threshold:0,use:false,total:0}]
 
 
function handleChange(value) {
    console.log(`selected ${value}`);
  }
  
var echarts = require('echarts');
class Table extends Component {
    constructor(props){
        super(props);
    }
    state={
        myChart:null,
        option:{},
        data:null,
        warningLine:1500,
        warningTime:0,
        colors:[ //TODO:颜色显示不够易读
            "rgba(38,66,98,1)",
            "rgba(20,100,188,1)",
            "rgba(41,166,208,1)",
            "rgba(85,240,220,1)",
            "rgba(160,66,98,1)",
            "rgba(160,100,188,1)",
            "rgba(160,166,208,1)",
            "rgba(160,240,220,1)",
            ],
        container:null,
        warningRules:{},
        // tempwarningRules:{}
    }
    parseData(newdata){
        var data_t=[];
        for(var i in newdata){            
             var list=[i].concat(newdata[i]);
             data_t.push(list);
        }
        return data_t;
    }
    componentWillReceiveProps(props){
        console.log(props.data);
        this.setState({data:this.parseData(props.data)});
        
        if(this.state.data==null){
          
            return ;
        }
        this.updateData( this.parseData(props.data) );
         
    }
    
    updateData(data){
        
        if(data==null){
            
            return ;
        }
        this.state.option.dataset.source=data; 
         var series=[];
        //根据数据组数设置 series visualMap
        var  list=[],i=-1;
        for (var item in data) {
            console.log(i,item,data[item],this.state.warningRules);
            if(i!=-1) {
                var temp = {
                    type: 'piecewise',
                    min: 0,
                    max: this.state.warningLine*2,
                    pieces: [{gt:10000},{gt:0,lte:10000}],// TODO hardcode
                    color: [this.state.colors[i+4],this.state.colors[i]],
                    realtime: true,
                    dimension: i+1
                };
                list.push(temp);
                series.push({
                    type: 'line',
                    seriesLayoutBy: 'row',
                  
                });
            }
            i++;
        }
         this.state.option["visualMap"] = list;
         this.state.option.series=series;
         
         console.log("this.updateData",this.state.option);
         
         this.state.myChart.setOption(this.state.option);
    }
    changeRules(warningRules){
        var tmarkLine=[],tpieces=[],color=[];
        for (var item in this.state.data) {
            if(item!="0"){
            var i=parseInt(item)-1;
            for (var j in warningRules[[this.state.data[item][0]]]) { 
                 if (warningRules[[this.state.data[item][0]]][j].use && warningRules[[this.state.data[item][0]]][j].threshold > 0) {
                    console.log(tpieces) ;
                      switch (warningRules[[this.state.data[item][0]]][j].name) {
                        case "上限": 
                            tpieces = [
                                { gt: warningRules[[this.state.data[item][0]]][j].threshold,color:this.state.colors[parseInt(item)+3 ] },
                                { gt: 0, lte: warningRules[[this.state.data[item][0]]][j].threshold,color:this.state.colors[parseInt(item)-1] },];
                            tmarkLine.push({
                                yAxis: warningRules[[this.state.data[item][0]]][j].threshold,

                            });
                            console.log(parseInt(item) ,this.state.colors[parseInt(item)+3 ],this.state.colors[parseInt(item)-1 ]);
                            break;
                        
                        case "下限":
                            tpieces = [
                                { gt: 0, lte: warningRules[[this.state.data[item][0]]][j].threshold ,color:this.state.colors[parseInt(item)+3]},
                                { gt: warningRules[[this.state.data[item][0]]][j].threshold ,color:this.state.colors[parseInt(item)-1] }],
                                tmarkLine.push({
                                    yAxis: warningRules[[this.state.data[item][0]]][j].threshold,

                                })
                                break;
                       
                       
                    }
                    console.log(tpieces,tmarkLine) ;//TODO:
                    this.state.option.series[parseInt(item)-1]["markLine"]={
                        silent:true,
                        data:tmarkLine};
                    var visualMap={
                        top: 10,
                        right: 10,
                        pieces: tpieces,
                        outOfRange: {
                            color: '#999'
                        }};
                       this.state.option.visualMap[parseInt(item)-1]=visualMap;
                       console.log( this.state.option);
                       tmarkLine=[];
                 }
                else if (warningRules[[this.state.data[item][0]]][j].use && 
                    //!!!这个bug找了一天半！！！！！我日！！！过分！！！
                    //让你一直logloglog，断点终于找到了这里少了个条件，
                    //然后！还没完呢，遇见设置为0的情况(visualmap映射到同一段的情况，还是解决不来，这种情况就压根不用visualmap啊
                    warningRules[[this.state.data[item][0]]][j].threshold == 0) {
                   /* switch (warningRules[[this.state.data[item][0]]][j].name) {
                        case "上限": {
                            tpieces = [
                                { gt: 0 ,
                                color:this.state.colors[parseInt(item)-1]} ];
                            tmarkLine = {
                                yAxis: 0,

                            }
                        }
                        case "下限": {
                            tpieces = [
                                { gt: 0,
                                color:
                                this.state.colors[parseInt(item)-1] }],
                                tmarkLine = {
                                    yAxis:0,

                                }
                        }
                        case "波动阈值":
                    }*/
                    
                }
            }         
            console.log(this.state.option );
        }
        }
        console.log("changerules",this.state.option );
        this.state.myChart.setOption(this.state.option);
    }
    componentDidMount(){ 
         this.state.myChart= echarts.init(document.getElementById(this.props.id));        
        this.state.myChart.group="group";
        echarts.connect('group');
        //图表基础设置
        this.state.option = {
            color:this.state.colors,
            title: {
                text:this.props.title
            },
            dataset:{
                source:[]
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {},
           
            xAxis: {
                type: 'category',
                gridIndex: 0
            },
            yAxis: {
                splitLine: {
                    show: false
                }
            },
            toolbox: {               
            },
            dataZoom: [
                {
                type:"slider",              
            }, {
                type: 'inside'
            }],
            series: [ 
            ]
        }
        this.updateData(this.parseData(this.props.data));
         
    }
    componentWillMount(){
        for(var i in this.props.data){
            if(i!="time"){
                this.state.warningRules[i]=sampleWarningRule;}
        }
        console.log(this.state.warningRules );
     }
    subDimension(dimension){
        this.state.myChart.dispatchAction({
            type: 'legendUnSelect',
             name: dimension 
        }) ;
        console.log( dimension,this.state.option);
    }
    addDimension(dimension){
        this.state.myChart.dispatchAction({
            type: 'legendSelect',
            name:dimension 
        })
    }
//模态框-用于修改警告规则
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk() {
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            var temp = JSON.parse(JSON.stringify(this.state.warningRules));
            var type = "";
            console.log('Received values of form: ', values);
            form.resetFields();
            for (var i in values) {
                var dim = i.substr(0, i.indexOf(','));

                if (i.substr(i.indexOf(',') + 1) == 'type') {
                    type = values[i];
                } else if (i.substr(i.indexOf(',') + 1) == 'threshold') {
                    for (var j in temp[dim]) {
                        if (type.indexOf(temp[dim][j].name) > 0) {
                            temp[dim][j].threshold = values[i];
                            temp[dim][j].use = true;
                        } else {
                            temp[i.substr(0, i.indexOf(','))][j].use = false;
                        }
                    }
                }
            }
            this.changeRules(temp);
            this.setState({
                warningRules: temp,
                visible: false
            });
        });
    }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }
  render() {
        var Rules=[]; 
        var now=0;
        for(var i in this.state.warningRules){
            for (var j in this.state.warningRules[i]) {      
                if (this.state.warningRules[i][j].use) {
                    Rules.push(
                    <Col  style={{marginLeft:24}}>
                        <div style={{ boxAlign: "center" }}>
                            <div style={{marginBottom:16, width: 6, height:48, backgroundColor: this.state.colors[now], float: "left" }} />

                           <div style={{  lineHeight: "16px", marginLeft: 14, fontSize: 12, }}>{i+this.state.warningRules[i][j].name  }</div> 
                             
                            <div id="warningLine" style={{marginBottom:16, lineHeight: "32px", marginLeft: 14, fontSize: 32, fontWeight: "bold" }}>{ this.state.warningRules[i][j].threshold} </div>
                        </div>                    
                    </Col>);                 
                } 
            }
            now++; 
        }

        return (
            <div >
                <div id={this.props.id} style={{ height: 320, width: "100%" }}>{this.props.id}</div>

                <div style={{ marginLeft: "6%", marginRight: "6%", marginTop: 16, marginBottom: 32, backgroundColor: "rgba(220,222,230,0.3)" }}>
                    <Row style={{ paddingTop: 12, paddingLeft: 16, }}>
                        <Col span={23} style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start" }}>
                            {Rules}
                        </Col>
                        
                        <Col span={1}>
                            <Icon type="edit" style={{ fontSize: 20, color: this.state.colors[0] }} onClick={this.showModal} />
                            <CollectionCreateForm
                                wrappedComponentRef={this.saveFormRef}
                                visible={this.state.visible}
                                onCancel={this.handleCancel}
                                onCreate={this.handleCreate}
                                warningRules={this.state.warningRules}
                            />

                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
export default Table;
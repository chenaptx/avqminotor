 
import React, { Component } from 'react';
import CollapsePanel from '../../node_modules/antd/lib/collapse/CollapsePanel';
import { Row, Col, InputNumber, Form  } from '../../node_modules/antd';
import { Select,Modal,Icon  } from 'antd';
import CollectionCreateForm  from './RulesInput.js'
var sampleWarningRule=[{name:"上限",threshold:0,use:true,total:0},
{name:"下限",threshold:0,use:false,total:0},
{name:"波动阈值",threshold:0,use:false,total:0}]
const Option = Select.Option;
const FormItem = Form.Item;
 
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
        console.log(data_t);
        return data_t;
    }
    componentWillReceiveProps(props){
         
       
        this.updateData(this.parseData(props.data));
    }
    updateData(data){
        
        
        this.state.option.dataset.source=data; 
        console.log(data,this.state.option);
        var series=[];
        //根据数据组数设置 series visualMap
        var  list=[],i=-1;
        for (var item in data) {
            if(i==-1){

            }
            else {
                 var temp = {
                    type: 'piecewise',
                    min: 0,
                    max: this.state.warningLine*2,
                    pieces: [
                        { gt: this.state.warningLine },
                        { gt: 0, lte: this.state.warningLine },
                    ],
                    color: [this.state.colors[i+4],this.state.colors[i]],
                    realtime: true,
                    dimension: i+1
                };
                 
                list.push(temp);
                 series.push({
                    type: 'line',
                    seriesLayoutBy: 'row',
                    markLine: {
                        silent: true,
                        animation: false,
                        symbol: ["pin", "pin"],
                        data: [{
                            yAxis: this.state.warningLine
                        }
                        ]
                    }
                });
            }
            i++;
        }
         this.state.option["visualMap"] = list;
         this.state.option.series=series;
         console.log(this.state.option);
         this.state.myChart.clear();
         this.state.myChart.setOption(this.state.option);
    }
    componentDidMount(){ 
         this.state.myChart= echarts.init(document.getElementById(this.props.id));
        //var chart=this.state.myChart;
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
        this.updateData();
         
    }
    componentWillMount(){
        for(var i in this.props.data){
            if(i!="time"){
            this.state.warningRules[i]=sampleWarningRule;}
        }
        // this.state.tempwarningRules=this.state.warningRules;
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
            // 图例名称
            name:dimension 
        })
    }
//模态框-用于修改警告规则
showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk()  {
       
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

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }
    render() {
        var Rules=[];
        
         
        for(var i in this.state.warningRules){
            var average = 24 / this.state.warningRules[i].length;
             var now=0;
            for (var j in this.state.warningRules[i]) {
                
                if (this.state.warningRules[i][j].use) {
                    now=j;
                    Rules.push(<Col  style={{marginLeft:24}}>
                        <div style={{ boxAlign: "center" }}>
                            <div style={{marginBottom:16, width: 6, height:48, backgroundColor: this.state.colors[j], float: "left" }} />

                           <div style={{  lineHeight: "16px", marginLeft: 14, fontSize: 12, }}>{i+this.state.warningRules[i][j].name  }</div> 
                             
                            <div id="warningLine" style={{marginBottom:16, lineHeight: "32px", marginLeft: 14, fontSize: 32, fontWeight: "bold" }}>{ this.state.warningRules[i][j].threshold} </div>
                        </div>                    </Col>);
                        
                } 

            }
        }

        return (
            <div >
                <div id={this.props.id} style={{ height: 400, width: "100%" }}>{this.props.id}</div>
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
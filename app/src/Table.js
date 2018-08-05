 
import React, { Component } from 'react';
import CollapsePanel from '../../node_modules/antd/lib/collapse/CollapsePanel';
import { Row, Col } from '../../node_modules/antd';
 
var echarts = require('echarts');
class Table extends Component {
    constructor(props){
        super(props);
    }
    state={
        myChart:null,
        data:[],
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
        container:null
    }
    parseData(){
        for(var i in this.props.data){
             var list=[i].concat(this.props.data[i]);
             this.state.data.push(list);
        }
    }
    componentDidMount(){ 
        var chart = echarts.init(document.getElementById(this.props.id));
        this.state.myChart=chart;
        //图表基础设置
        var option = {
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
        this.parseData();
        option.dataset.source=this.state.data; 

        //根据数据组数设置 series visualMap
        var  list=[],i=-1;
        for (var item in this.props.data) {
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
                option.series.push({
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
        option["visualMap"] = list;
        chart.setOption(option);

        //图例选中控制treemenu
        /*
        chart.on("legendselectchanged",function (params) {
            // 获取点击图例的选中状态
            var  isSelected = params.selected[params.name];
            // 在控制台中打印
            console.log((isSelected ? '选中了' : '取消选中了') + '图例' + params.name);
            // 打印所有图例的状态 
            if(isSelected){
                s(params.name);
            }
            else{
                us(params.name);

            }
        });*/

        //全局图表同步x轴
        chart.group="group";
        echarts.connect('group');
 
    }

    subDimension(dimension){
        this.state.myChart.dispatchAction({
            type: 'legendUnSelect',
             name: dimension 
        }) 
    }
    addDimension(dimension){
        this.state.myChart.dispatchAction({
            type: 'legendSelect',
            // 图例名称
            name:dimension 
        })
    }
    render() {
        return(
        <div >
            <div id={this.props.id}  style={{height:300,width:"100%"}}>{this.props.id}</div>
            <div style={{marginLeft:"6%",marginRight:"6%",marginTop:16,marginBottom:32, height:72,backgroundColor:"rgba(220,222,230,0.3)"}}>
                <Row style={{paddingTop:12, paddingLeft:16,height:72}}>
                    <Col span={6}>
                    <div style={{boxAlign:"center"}}>
                        <div style={{ width:6,height:48,backgroundColor:this.state.colors[0],float:"left"}}/>
                         
                        <div style={{ lineHeight:"16px",marginLeft:14,fontSize:12, }}>WARNINGLINE</div>
                         
                        <div id="warningLine" style={{ lineHeight:"32px", marginLeft:14,fontSize:28,fontWeight:"bold"}}>1500</div>     
                    </div>
                    </Col>
                    <Col span={6}>
                    <div style={{boxAlign:"center"}}>
                        <div style={{ width:6,height:48,backgroundColor:this.state.colors[0],float:"left"}}/>
                         
                        <div style={{ lineHeight:"16px",marginLeft:14,fontSize:12, }}>WARNINGLINE</div>
                         
                        <div id="warningLine" style={{ lineHeight:"32px", marginLeft:14,fontSize:28,fontWeight:"bold"}}>1500</div>     
                    </div>                    </Col>

                    <Col span={6}>
                    <div style={{boxAlign:"center"}}>
                        <div style={{ width:6,height:48,backgroundColor:this.state.colors[0],float:"left"}}/>
                         
                        <div style={{ lineHeight:"16px",marginLeft:14,fontSize:12, }}>WARNINGLINE</div>
                         
                        <div id="warningLine" style={{ lineHeight:"32px", marginLeft:14,fontSize:28,fontWeight:"bold"}}>1500</div>     
                    </div>                    </Col>

                    <Col span={6}>
                    <div style={{boxAlign:"center"}}>
                        <div style={{ width:6,height:48,backgroundColor:this.state.colors[0],float:"left"}}/>
                         
                        <div style={{ lineHeight:"16px",marginLeft:14,fontSize:12, }}>WARNINGLINE</div>
                         
                        <div id="warningLine" style={{ lineHeight:"32px", marginLeft:14,fontSize:28,fontWeight:"bold"}}>1500</div>     
                    </div>                    </Col>

                </Row>
            </div>
        </div>
        )
    }
}
export default Table;
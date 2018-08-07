import { Select, Modal, Form, Input, Radio } from 'antd';
import React, { Component } from 'react';
import { Row,  InputNumber  } from '../../node_modules/antd';
 
const FormItem = Form.Item;
const Option = Select.Option;

const CollectionCreateForm = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      var RulesSettings=[]; 
      for (var i in this.props.warningRules) {
        var average = 24 / this.props.warningRules[i].length;
        var now = 0;
        for (var j in this.props.warningRules[i]) {

          if (this.props.warningRules[i][j].use) {
            now = j;
          }
        }
        RulesSettings.push(

          <Row style={{ marginBottom: 16, display: "flex", flexDirection: "row", }}>

            <FormItem style={{ lineHeight: "16px", marginLeft: 8, marginRight: 16 }} >
            {getFieldDecorator('Select'+i)(
            <Select defaultValue={i + this.props.warningRules[i][now].name}  
                onChange={function (value) {
                  console.log(i, "onchange", value)
                 
                }.bind(this)}
              >
                <Option style={{ fontSize: 12 }} value={0}>{i + this.props.warningRules[i][0].name}</Option>
                <Option style={{ fontSize: 12 }} value={1}>{i + this.props.warningRules[i][1].name}</Option>
                <Option style={{ fontSize: 12 }} value={2} >{i + this.props.warningRules[i][2].name}</Option>
              </Select>)}
            </FormItem>

            <FormItem style={{ lineHeight: "16px", marginLeft: 8, marginRight: 16 }} >

               {getFieldDecorator("threshold"+i)( <InputNumber  value={this.props.warningRules[i][now].threshold}
                onChange={function (value) {
                  console.log(i, "onchange", value)
               
                }.bind(this)}>

              </InputNumber >)}

            </FormItem>

          </Row>

        );
      }
     
 
      return (
        <Modal
          visible={visible}
          title="Create a new collection"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
          {RulesSettings}
            <FormItem label="Title">
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="Description">
              {getFieldDecorator('description')(<Input type="textarea" />)}
            </FormItem>
            <FormItem className="collection-create-form_last-form-item">
              {getFieldDecorator('modifier', {
                initialValue: 'public',
              })(
                <Radio.Group>
                  <Radio value="public">Public</Radio>
                  <Radio value="private">Private</Radio>
                </Radio.Group>
              )}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);
export default CollectionCreateForm;
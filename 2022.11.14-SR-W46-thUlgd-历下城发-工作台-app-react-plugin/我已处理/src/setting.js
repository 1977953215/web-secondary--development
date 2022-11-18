import React, { useEffect } from "react";
import { Input, Form } from "antd";
import "./app.less";

const Setting = (props) => {
   const { onConfigChange } = props;

   const [form] = Form.useForm();

   useEffect(() => {
      try {
         form.setFieldsValue(props.customConfig);
      } catch (error) {
         console.error("configuration解析错误", error);
      }
   }, []);

   const onFormLayoutChange = (changedValues, allValues) => {
      onConfigChange && onConfigChange(allValues);
   };

   const formItemLayout = {
      labelCol: { span: 24 },
      wrapperCol: { span: 24 },
   };

   return (
      <Form {...formItemLayout} layout="vertical" form={form} onValuesChange={onFormLayoutChange}>
         <Form.Item label="组件高度" name="moduleHeight">
            <Input></Input>
         </Form.Item>
         <Form.Item label="我已处理" name="wyclFolw">
            <Input />
         </Form.Item>
      </Form>
   );
};

export default Setting;

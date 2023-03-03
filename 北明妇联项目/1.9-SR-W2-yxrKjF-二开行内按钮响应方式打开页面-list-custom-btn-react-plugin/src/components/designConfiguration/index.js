const React = window.React;
const { useEffect } = React;
const { Form, Input } = window.antd;
const DesignConfiguration = ({ changeConfiguration, configuration }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    try {
      form.setFieldsValue(JSON.parse(configuration));
    } catch (error) {
      console.error("configuration解析错误", error);
    }
  }, []);

  const onFormLayoutChange = (changedValues, allValues) => {
    changeConfiguration(allValues);
  };

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  return (
    <>
      <Form
        {...formItemLayout}
        form={form}
        onValuesChange={onFormLayoutChange}
      >
        <Form.Item label="取值列名位置：" name="column" initialValue={''}>
          <Input />
        </Form.Item>
        <Form.Item label="跳转参数名：" name="keyName" initialValue={''}>
          <Input />
        </Form.Item>
        <Form.Item label="跳转url：" name="goURL" initialValue={''}>
          <Input />
        </Form.Item>
      </Form>
    </>
  );
};

DesignConfiguration.propTypes = {};

export default DesignConfiguration;

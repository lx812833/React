import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import md5 from "js-md5";
import { loginApi, Login } from "@/api/modules/login";
import { HOME_URL } from "@/config/config";
import { UserOutlined, LockOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { setToken, setUserInfo } from "@/redux/modules/global/action";
import { setTabsList } from "@/redux/modules/tabs/action";

const LoginForm = (props: any) => {
	const { setToken, setTabsList, setUserInfo } = props;
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const [loading, setLoading] = useState<boolean>(false);

	// 登录
	const onFinish = async (loginForm: Login.ReqLoginForm) => {
		try {
			setLoading(true);
			loginForm.password = md5(loginForm.password);
			const { data } = await loginApi(loginForm);
			setUserInfo(loginForm.username);
			setToken(data?.access_token);
			setTabsList([]);
			message.success("登录成功！");
			navigate(HOME_URL);
		} finally {
			setLoading(false);
		}
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

	// initialValues：表单默认值，只有初始化以及重置时生效

	return (
		<Form
			form={form}
			name="basic"
			labelCol={{ span: 5 }}
			initialValues={{ 
				username: "admin",
				password: "123456"
			}}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			size="large"
			autoComplete="off"
		>
			<Form.Item name="username" rules={[{ required: true, message: "请输入用户名" }]}>
				<Input placeholder="用户名：admin / user" prefix={<UserOutlined />} />
			</Form.Item>
			<Form.Item name="password" rules={[{ required: true, message: "请输入密码" }]}>
				<Input.Password autoComplete="new-password" placeholder="密码：123456" prefix={<LockOutlined />} />
			</Form.Item>
			<Form.Item className="login-btn">
				<Button
					onClick={() => {
						form.resetFields();
					}}
					icon={<CloseCircleOutlined />}
				>
					{t("login.reset")}
				</Button>
				<Button type="primary" htmlType="submit" loading={loading} icon={<UserOutlined />}>
					{t("login.confirm")}
				</Button>
			</Form.Item>
		</Form>
	);
};

/**
 * react-redux 核心方法
 * 
 * connect：connect 用于连接 UI 组件与 redux，使用 connect()() 创建并暴露一个 Count 的容器组件
 * mapStateToProps：意译为“把 state 映射到 props 中去”，其实也就是把 Redux 中的数据映射到 React 中的props中去。
 * mapDispatchToProps：把各种 dispatch 变成了 props，在组件中可以直接使用。
 */

// 通过react-redux的connect方法，将mapStateToProps与mapDispatchToProps 方法与组件链接，
// 然后直接在类组件中通过props.XXX的方式进行访问Store中的state.
const mapDispatchToProps = { setToken, setTabsList, setUserInfo };
export default connect(null, mapDispatchToProps)(LoginForm);

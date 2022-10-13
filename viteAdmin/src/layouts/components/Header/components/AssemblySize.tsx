import { Dropdown, Menu } from "antd";
import { connect } from "react-redux";
import { setAssemblySize } from "@/redux/modules/global/action";

const AssemblySize = (props: any) => {
	const { assemblySize, setAssemblySize } = props;

	// 切换组件大小
	const onClick = (e: MenuInfo) => {
		setAssemblySize(e.key);
	};

	const menu = (
		<Menu
			items={[
				{
					key: "middle",
					disabled: assemblySize == "middle",
					label: <span>默认</span>,
					onClick
				},
				{
					disabled: assemblySize == "large",
					key: "large",
					label: <span>大型</span>,
					onClick
				},
				{
					disabled: assemblySize == "small",
					key: "small",
					label: <span>小型</span>,
					onClick
				}
			]}
		/>
	);
	return (
		<Dropdown overlay={menu} placement="bottom" trigger={["click"]} arrow={true}>
			<i className="icon-style iconfont icon-contentright"></i>
		</Dropdown>
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

const mapStateToProps = (state: any) => state.global;
const mapDispatchToProps = { setAssemblySize };
export default connect(mapStateToProps, mapDispatchToProps)(AssemblySize);

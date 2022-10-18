import { Layout } from "antd";
import { connect } from "react-redux";
import Theme from "./components/Theme";
import Language from "./components/Language";
import Fullscreen from "./components/Fullscreen";
import AvatarIcon from "./components/AvatarIcon";
import AssemblySize from "./components/AssemblySize";
import CollapseIcon from "./components/CollapseIcon";
import BreadcrumbNav from "./components/BreadcrumbNav";
import "./index.less";

const LayoutHeader = (props: any) => {
	const { userInfo } = props;
	const { Header } = Layout;

	return (
		<Header>
			<div className="header-lf">
				<CollapseIcon />
				<BreadcrumbNav />
			</div>
			<div className="header-ri">
				<AssemblySize />
				<Language />
				<Theme />
				<Fullscreen />
				<span className="username">{userInfo}</span>
				<AvatarIcon />
			</div>
		</Header>
	);
};


const mapStateToProps = (state: any) => state.global;
export default connect(mapStateToProps)(LayoutHeader);
import { Layout } from "antd";
// import AvatarIcon from "./components/AvatarIcon";
import Theme from "./components/Theme";
import CollapseIcon from "./components/CollapseIcon";
import BreadcrumbNav from "./components/BreadcrumbNav";
// import AssemblySize from "./components/AssemblySize";
// import Language from "./components/Language";
// import Fullscreen from "./components/Fullscreen";
import "./index.less";

const LayoutHeader = () => {
	const { Header } = Layout;

	return (
		<Header>
			<div className="header-lf">
				<CollapseIcon />
				<BreadcrumbNav />
			</div>
			<div className="header-ri">
				{/* <AssemblySize /> */}
				AssemblySize
				{/* <Language /> */}
				Language
				<Theme />
				{/* <Fullscreen /> */}
				Fullscreen
				<span className="username">Hooks</span>
				{/* <AvatarIcon /> */}
				AvatarIcon
			</div>
		</Header>
	);
};

export default LayoutHeader;
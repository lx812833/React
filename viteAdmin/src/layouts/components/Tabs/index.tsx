import { message, Tabs } from "antd";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { setTabsList } from "@/redux/modules/tabs/action";
import { useLocation, useNavigate } from "react-router-dom";
import { routerArray } from "@/routers";
import { searchRoute } from "@/utils/util";
import { HOME_URL } from "@/config/config";
import { HomeFilled } from "@ant-design/icons";
import MoreButton from "./components/MoreButton";
import "./index.less";

const LayoutTabs = (props: any) => {
	const { setTabsList } = props;
	const { tabsList } = props.tabs;
	const { themeConfig } = props.global;
	const { TabPane } = Tabs;
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const [activeValue, setActiveValue] = useState<string>(pathname);

	useEffect(() => {
		addTabs();
	}, [pathname]);

	// click tabs
	const clickTabs = (path: string) => {
		navigate(path);
	};

	// add tabs
	const addTabs = () => {
		const route = searchRoute(pathname, routerArray);
		let newTabsList = JSON.parse(JSON.stringify(tabsList));
		if (tabsList.every((item: any) => item.path !== route.path)) {
			newTabsList.push({ title: route.meta!.title, path: route.path });
		}
		setTabsList(newTabsList);
		setActiveValue(pathname);
	};

	// delete tabs
	const delTabs = (tabPath?: string) => {
		if (tabPath === HOME_URL) return;
		if (pathname === tabPath) {
			tabsList.forEach((item: Menu.MenuOptions, index: number) => {
				if (item.path !== pathname) return;
				const nextTab = tabsList[index + 1] || tabsList[index - 1];
				if (!nextTab) return;
				navigate(nextTab.path);
			});
		}
		message.success("你删除了Tabs标签 😆😆😆");
		setTabsList(tabsList.filter((item: Menu.MenuOptions) => item.path !== tabPath));
	};

	return (
		<>
			{!themeConfig.tabs && (
				<div className="tabs">
					<Tabs
						animated
						activeKey={activeValue}
						onChange={clickTabs}
						hideAdd
						type="editable-card"
						onEdit={path => {
							delTabs(path as string);
						}}
						items={
							tabsList.map((item: Menu.MenuOptions) => {
								return {
									label: (
										<span>
											{item.path == HOME_URL ? <HomeFilled /> : ""}
											{item.title}
										</span>
									),
									key: item.path,
									closable: item.path !== HOME_URL
								}
							})
						}
					/>
					<MoreButton tabsList={tabsList} delTabs={delTabs} setTabsList={setTabsList}></MoreButton>
				</div>
			)}
		</>
	);
};

const mapStateToProps = (state: any) => state;
const mapDispatchToProps = { setTabsList };

export default connect(mapStateToProps, mapDispatchToProps)(LayoutTabs);

import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, Spin } from "antd";
import type { MenuProps } from 'antd';
import * as Icons from "@ant-design/icons";
import { setMenuList } from "@/redux/modules/menu/action";
import { setAuthRouter } from "@/redux/modules/auth/action";
import { setBreadcrumbList } from "@/redux/modules/breadcrumb/action";
import { findAllBreadcrumb, getOpenKeys, handleRouter, searchRoute } from "@/utils/util";
import Logo from "./components/Logo";
import { getMenuList } from "@/api/modules/login";
import "./index.less";

const LayoutMenu = (props: any) => {
	const { pathname } = useLocation();
	const { isCollapse, setBreadcrumbList, setAuthRouter, setMenuList: setMenuListAction } = props;
	const [loading, setLoading] = useState(false);
	const [openKeys, setOpenKeys] = useState<string[]>([]);
	const [menuList, setMenuList] = useState<MenuItem[]>([]);
	const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname]);

	useEffect(() => {
		getMenuData();
	}, [])

	// 刷新页面菜单保持高亮
	useEffect(() => {
		setSelectedKeys([pathname]);
		isCollapse ? null : setOpenKeys(getOpenKeys(pathname));
	}, [pathname, isCollapse]);

	// 定义 menu 类型
	type MenuItem = Required<MenuProps>["items"][number];
	const getItem = (
		label: React.ReactNode,
		key?: React.Key | null,
		icon?: React.ReactNode,
		children?: MenuItem[],
		type?: "group"
	): MenuItem => {
		return {
			key,
			icon,
			children,
			label,
			type
		} as MenuItem;
	};

	// 获取菜单列表并处理成 antd menu 需要的格式
	const getMenuData = async () => {
		try {
			setLoading(true);
			const { data } = await getMenuList();
			if (!data) {
				return;
			}
			setMenuListAction(data);
			setMenuList(deepLoopFloat(data));
			// 存储处理过后的所有面包屑导航栏到 redux 中
			setBreadcrumbList(findAllBreadcrumb(data));
			// 把路由菜单处理成一维数组，存储到 redux 中，做菜单权限判断
			const dynamicRouter = handleRouter(data);
			setAuthRouter(dynamicRouter);
		} finally {
			setLoading(false);
		}
	}

	// 处理后台返回菜单 key 值为 antd 菜单需要的 key 值
	const deepLoopFloat = (menuList: Menu.MenuOptions[], newArr: MenuItem[] = []) => {
		menuList.forEach(item => {
			if (!item?.children?.length) {
				newArr.push(getItem(item.title, item.path, addIcon(item.icon!))); // 非空断言 "! "
			} else {
				newArr.push(getItem(item.title, item.path, addIcon(item.icon!), deepLoopFloat(item.children)));
			}
		})
		return newArr;
	}

	// 动态渲染 Icon 图标
	const customIcons: { [key: string]: any } = Icons;
	const addIcon = (name: string) => {
		return React.createElement(customIcons[name]);
	};

	// 点击当前菜单跳转页面
	const navigate = useNavigate();
	const clickMenu: MenuProps["onClick"] = ({ key }: { key: string }) => {
		const route = searchRoute(key, props.menuList);
		if (route.isLink) {
			// window.open(route.isLink, "_blank");
		}
		// navigate(key);
	};

	// 设置当前展开的 subMenu
	const onOpenChange = (openKeys: string[]) => {
		if (openKeys.length === 0 || openKeys.length === 1) {
			return setOpenKeys(openKeys);
		}
		const latestOpenKey = openKeys[openKeys.length - 1];
		if (latestOpenKey.includes(openKeys[0])) {
			return setOpenKeys(openKeys);
		}
		setOpenKeys([latestOpenKey]);
	}

	return (
		<div className="menu">
			<Spin spinning={loading} tip="Loading...">
				<Logo />
				<Menu
					theme="light"
					mode="inline"
					triggerSubMenuAction="click"
					openKeys={openKeys}
					selectedKeys={selectedKeys}
					items={menuList}
					onClick={clickMenu}
					onOpenChange={onOpenChange}
				></Menu>
			</Spin>
		</div>
	);
};

const mapStateToProps = (state: any) => state.menu;
const mapDispatchToProps = { setMenuList, setBreadcrumbList, setAuthRouter };
export default connect(mapStateToProps, mapDispatchToProps)(LayoutMenu);

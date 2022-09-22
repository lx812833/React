import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getMenuList } from "@/api/modules/login";
import "./index.less";

const LayoutMenu = (props: any) => {

	// 获取菜单列表
	const getMenuData = async () => {
		const res = await getMenuList();
		console.log("菜单列表", res);
	}

	useEffect(() => {
		getMenuData();
	}, [])

	return (
		<div className="menu">
			Menu
		</div>
	);
};

export default LayoutMenu;

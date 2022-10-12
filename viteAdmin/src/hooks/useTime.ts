import moment from "moment";
import { useEffect, useState, useRef } from "react";

/**
 * @description 获取本地时间
 */
export const useTimes = () => {
	const TIME_TYPE = moment().format("YYYY年MM月DD日 HH:mm:ss");
	const timer: any = useRef(null);
	const [time, setTime] = useState(TIME_TYPE);
	useEffect(() => {
		timer.current = setInterval(() => {
			setTime(TIME_TYPE);
		}, 1000);
		return () => {
			clearInterval(timer.current);
		};
	}, [time]);

	return {
		time
	};
};

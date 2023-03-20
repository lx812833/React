import { forwardRef, useImperativeHandle, useRef } from "react";
import welcome from "@/assets/images/welcome01.png";
import "./index.less";

const Child = forwardRef((_, ref): any => {
	useImperativeHandle(ref, () => {
		return {
			propsEvent: (val: string, func: Function) => handleTest(val, func)
		}
	})

	const handleTest = (val: string, func: Function) => {
		console.log('传递的', val);

		setTimeout(() => {
			func('321');
		}, 1500);
	}
})

const Home = () => {
	const childRef: any = useRef();

	const handleClick = () => {
		childRef.current.propsEvent('123', handleBack);
	}

	const handleBack = (val: string) => {
		console.log('回调了', val);
	}

	return (
		<div className="home card">
			<img src={welcome} alt="welcome" onClick={handleClick} />

			<Child ref={childRef} />
		</div>
	);
};

export default Home;

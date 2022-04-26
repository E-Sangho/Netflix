import { DropDown, MenuIcon, Logo } from "./styles/header";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

interface IHeader {
	children: React.ReactNode;
	restProps: React.ReactNode;
}
function Header({ children, ...restProps }: IHeader) {
	return <h1>Header</h1>;
}

interface IHeaderLogo {
	to: string;
	src: string;
}

function HeaderLogo({ to, src }: IHeaderLogo) {
	return (
		<Link to={to}>
			<Logo src={src} />
		</Link>
	);
}

interface IDropDown {
	Icon: React.ReactNode;
	Contents: React.ReactNode;
}

function HeaderDropDown({ Icon, Contents }: IDropDown) {
	let enterDelay = 200,
		leaveDelay = 200;
	let mouseEnterTimer: NodeJS.Timeout, mouseLeaveTimer: NodeJS.Timeout;
	const [menuOpened, setMenuOpened] = useState(false);
	const menuRef = useRef<HTMLDivElement | null>(null);
	const menuClicked = () => {
		setMenuOpened((prev) => !prev);
	};
	const mouseEnterHandler = () => {
		clearTimeout(mouseLeaveTimer);
		mouseEnterTimer = setTimeout(() => {
			setMenuOpened(true);
		}, enterDelay);
	};
	const mouseLeaveHandler = () => {
		clearTimeout(mouseEnterTimer);
		mouseLeaveTimer = setTimeout(() => {
			setMenuOpened(false);
		}, leaveDelay);
	};
	useEffect(() => {
		const handler = (event: any) => {
			if (
				menuOpened &&
				menuRef.current &&
				!menuRef.current.contains(event.target)
			) {
				setMenuOpened(false);
			}
		};
		document.addEventListener("mousedown", handler);
		return () => {
			document.removeEventListener("mousedown", handler);
		};
	}, [menuOpened]);
	return (
		<div
			ref={menuRef}
			onMouseEnter={mouseEnterHandler}
			onMouseLeave={mouseLeaveHandler}
		>
			<MenuIcon onClick={menuClicked}>{Icon}</MenuIcon>
			{menuOpened ? <DropDown>{Contents}</DropDown> : null}
		</div>
	);
}

export { HeaderDropDown, HeaderLogo };

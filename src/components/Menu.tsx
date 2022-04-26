import styled from "styled-components";
import { useRecoilState } from "recoil";
import { menuAtom } from "../atoms";
import { useEffect, useRef, useState } from "react";
import Navigation from "./Navigation";

const MenuIcon = styled.button`
	display: flex;
	color: white;
	fill: white;
	align-items: center;
	display: none;
	position: relative;
	@media only screen and (max-width: 767px) {
		display: flex;
		width: 50px;
		height: 30px;
		svg {
			position: absolute;
			top: 0px;
			left: 28px;
		}
	}
`;

const DropDown = styled.div`
	width: 240px;
	position: absolute;
	top: 41px;
	left: -72px;
	background-color: rgb(20, 20, 20);
	border: 1px solid rgb(50, 50, 50);
	border-top: 3px solid white;
	opacity: 0.8;
	ul {
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	li {
		width: 100%;
		height: 40px;
		display: none;
		@media only screen and (max-width: 767px) {
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
`;

function Menu() {
	let enterDelay = 200,
		leaveDelay = 200;
	let mouseEnterTimer: NodeJS.Timeout, mouseLeaveTimer: NodeJS.Timeout;
	const [menuOpened, setMenuOpened] = useRecoilState(menuAtom);
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
			<MenuIcon onClick={menuClicked}>
				Menu
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="70%"
					height="70%"
					viewBox="0 0 320 512"
				>
					<path d="M310.6 246.6l-127.1 128C176.4 380.9 168.2 384 160 384s-16.38-3.125-22.63-9.375l-127.1-128C.2244 237.5-2.516 223.7 2.438 211.8S19.07 192 32 192h255.1c12.94 0 24.62 7.781 29.58 19.75S319.8 237.5 310.6 246.6z" />
				</svg>
			</MenuIcon>
			{menuOpened ? (
				<DropDown>
					<Navigation />
				</DropDown>
			) : null}
		</div>
	);
}

export default Menu;

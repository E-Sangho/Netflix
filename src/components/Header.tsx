import { useViewportScroll, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import Search from "./SearchIcon";
import Navigation from "./Navigation";
import User from "./UserIcon";
import Alarm from "./Alarm";
import Menu from "./Menu";
import {
	Wrapper,
	StartWrapper,
	EndWrapper,
	NavLinkWrapper,
	NavIconWrapper,
} from "./styledHeader";
import { menuAtom } from "../atoms";
import { useRecoilState } from "recoil";
import styled from "styled-components";

const navVariants = {
	initial: {
		backgroundColor: "rgba(0, 0, 0, 0)",
	},
	scroll: {
		backgroundColor: "rgba(0, 0, 0, 1)",
	},
};

interface IDropDown {
	$visible: boolean;
}

const DropDown = styled.div<IDropDown>`
	width: 240px;
	position: absolute;
	top: 41px;
	left: -72px;
	display: ${(props) => (props.$visible ? "block" : "none")};
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

function Header() {
	const [menuOpened, setMenuOpened] = useRecoilState(menuAtom);
	const { scrollY } = useViewportScroll();
	const controls = useAnimation();
	useEffect(() => {
		scrollY.onChange(() => {
			if (scrollY.get() > 0) {
				controls.start("scroll");
			} else {
				controls.start("initial");
			}
		});
	}, [scrollY]);
	return (
		<Wrapper variants={navVariants} animate={controls} initial="initial">
			<StartWrapper>
				<Logo />
				<NavLinkWrapper>
					<Menu />
					<DropDown $visible={menuOpened}>
						<Navigation />
					</DropDown>
					<Navigation />
				</NavLinkWrapper>
			</StartWrapper>
			<EndWrapper>
				<NavIconWrapper>
					<Search />
					<Alarm />
					<User />
				</NavIconWrapper>
			</EndWrapper>
		</Wrapper>
	);
}

export default Header;

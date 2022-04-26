import { useViewportScroll, useAnimation } from "framer-motion";
import { useEffect } from "react";
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

const navVariants = {
	initial: {
		backgroundColor: "rgba(0, 0, 0, 0)",
	},
	scroll: {
		backgroundColor: "rgba(0, 0, 0, 1)",
	},
};

function Header() {
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

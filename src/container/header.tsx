import { useViewportScroll, useAnimation } from "framer-motion";
import { useEffect } from "react";
import {
	Wrapper,
	StartWrapper,
	EndWrapper,
	NavLinkWrapper,
	NavIconWrapper,
} from "../components/head/styles/wrapper";

import {
	HeaderLogo,
	HeaderDropDown,
	HeaderMenu,
	HeaderNavigation,
	HeaderSearch,
	HeaderAlarm,
	HeaderUser,
} from "../components/head";
import NetflixLogo from "../assets/logo.svg";

const navVariants = {
	initial: {
		backgroundColor: "rgba(0, 0, 0, 0)",
	},
	scroll: {
		backgroundColor: "rgba(0, 0, 0, 1)",
	},
};

export function HeaderContainer() {
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
				<HeaderLogo to={"/"} src={NetflixLogo} />
				<NavLinkWrapper>
					<HeaderDropDown
						Icon={<HeaderMenu />}
						Contents={<HeaderNavigation />}
					/>
					<HeaderNavigation />
				</NavLinkWrapper>
			</StartWrapper>
			<EndWrapper>
				<NavIconWrapper>
					<HeaderSearch />
					<HeaderAlarm />
					<HeaderUser />
				</NavIconWrapper>
			</EndWrapper>
		</Wrapper>
	);
}

export default HeaderContainer;

import {
	SearchIcon,
	DropDown,
	MenuIcon,
	Logo,
	Menu,
	Input,
	NavIcon,
	NavWrapper,
	NavLink,
} from "./styles/component";
import {
	Wrapper,
	StartWrapper,
	EndWrapper,
	NavLinkWrapper,
	NavIconWrapper,
} from "./styles/wrapper";
import { IHeaderLogo, IDropDown } from "./styles/interface";
import { Link, useMatch, useNavigate } from "react-router-dom";
import {
	ChangeEventHandler,
	FormEventHandler,
	useEffect,
	useRef,
	useState,
} from "react";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import NetflixLogo from "../../assets/logo.svg";

const navVariants = {
	initial: {
		backgroundColor: "rgba(0, 0, 0, 0)",
		backgroundImage:
			"linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 10%, rgba(0, 0, 0, 0))",
	},
	scroll: {
		backgroundColor: "rgba(20, 20, 20, 1)",
		transition: {
			duration: 0.1,
		},
	},
};

export default function Header() {
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

function HeaderLogo({ to, src }: IHeaderLogo) {
	return (
		<Link to={to}>
			<Logo src={src} />
		</Link>
	);
}

function HeaderMenu() {
	return <Menu>Menu ▾</Menu>;
}

function HeaderDropDown({ Icon, Contents }: IDropDown) {
	let enterDelay = 50,
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

function HeaderSearch() {
	const [keyword, setKeyword] = useState("");
	const [disabled, setDisabled] = useState(false);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [searching, setSearching] = useState<boolean>(false);
	const openSearch = () => {
		searching ? inputRef.current?.blur() : inputRef.current?.focus();
		setSearching((prev) => !prev);
	};
	const navigate = useNavigate();
	const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
		setDisabled(true);
		event.preventDefault();
		navigate(`/search?keyword=${keyword}`);
		setKeyword("");
		setDisabled(false);
	};
	const inputChange: ChangeEventHandler<HTMLInputElement> = ({
		target: { value },
	}) => {
		setKeyword(value);
	};
	return (
		<SearchIcon
			$searching={searching}
			animate={{ width: searching ? "250px" : "auto" }}
			transition={{ type: "linear" }}
			onSubmit={onSubmit}
		>
			<NavIcon>
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					width="100%"
					height="100%"
					viewBox="0 0 512 512"
					transition={{ type: "linear" }}
					key="searchIcon"
					onClick={openSearch}
				>
					<path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" />
				</motion.svg>
			</NavIcon>
			<Input
				ref={inputRef}
				initial={{ scaleX: 0 }}
				animate={{ scaleX: searching ? 1 : 0 }}
				onBlur={openSearch}
				transition={{ type: "linear" }}
				key="searchInput"
				placeholder="제목,사람,장르"
				required
				minLength={2}
				value={keyword}
				onChange={inputChange}
				disabled={disabled}
			/>
		</SearchIcon>
	);
}

function HeaderUser() {
	return (
		<NavIcon>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="100%"
				height="100%"
				viewBox="0 0 448 512"
			>
				<path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z" />
			</svg>
		</NavIcon>
	);
}

function HeaderAlarm() {
	return (
		<NavIcon>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="100%"
				height="100%"
				viewBox="0 0 448 512"
			>
				<path d="M256 32V51.2C329 66.03 384 130.6 384 208V226.8C384 273.9 401.3 319.2 432.5 354.4L439.9 362.7C448.3 372.2 450.4 385.6 445.2 397.1C440 408.6 428.6 416 416 416H32C19.4 416 7.971 408.6 2.809 397.1C-2.353 385.6-.2883 372.2 8.084 362.7L15.5 354.4C46.74 319.2 64 273.9 64 226.8V208C64 130.6 118.1 66.03 192 51.2V32C192 14.33 206.3 0 224 0C241.7 0 256 14.33 256 32H256zM224 512C207 512 190.7 505.3 178.7 493.3C166.7 481.3 160 464.1 160 448H288C288 464.1 281.3 481.3 269.3 493.3C257.3 505.3 240.1 512 224 512z" />
			</svg>
		</NavIcon>
	);
}

function HeaderNavigation() {
	const homeMatch = useMatch("/");
	const seriesMatch = useMatch("series");
	const moviesMatch = useMatch("movies");
	const latestMatch = useMatch("latest");
	const myListMatch = useMatch("my-list");
	return (
		<NavWrapper>
			<NavLink>
				<Link
					to={`/`}
					style={{
						fontWeight: homeMatch ? "bold" : "normal",
					}}
				>
					Home
				</Link>
			</NavLink>
			<NavLink>
				<Link
					to={`/tvshows`}
					style={{
						fontWeight: seriesMatch ? "bold" : "normal",
					}}
				>
					TvShows
				</Link>
			</NavLink>
			{/*
			<NavLink>
				<Link
					to="movies"
					style={{
						fontWeight: moviesMatch ? "bold" : "normal",
					}}
				>
					Movies
				</Link>
			</NavLink>
			<NavLink>
				<Link
					to="latest"
					style={{
						fontWeight: latestMatch ? "bold" : "normal",
					}}
				>
					Latest
				</Link>
			</NavLink>
			<NavLink>
				<Link
					to="my-list"
					style={{
						fontWeight: myListMatch ? "bold" : "normal",
					}}
				>
					MyList
				</Link>
			</NavLink>
				*/}
		</NavWrapper>
	);
}

export {
	HeaderDropDown,
	HeaderLogo,
	HeaderMenu,
	HeaderSearch,
	HeaderUser,
	HeaderAlarm,
	HeaderNavigation,
};

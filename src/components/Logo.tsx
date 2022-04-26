import { HeaderLogo } from "./head";
import NetflixLogo from "../assets/logo.svg";

function Logo() {
	return <HeaderLogo to={"/"} src={NetflixLogo} />;
}

export default Logo;

import styled from "styled-components";
import { Link } from "react-router-dom";

const NetflixLogo = styled.svg`
	margin-left: 50px;
	margin-right: 40px;
	width: 100px;
	height: 32px;
	fill: ${(props) => props.theme.red};
	@media only screen and (min-width: 768px) and (max-width: 1023px) {
		width: 10em;
		margin-left: 30px;
		margin-right: 15px;
	}
	@media only screen and (max-width: 767px) {
		width: 10em;
		margin-left: 20px;
		margin-right: 10px;
	}
`;

function Logo() {
	return (
		<Link to="/">
			<NetflixLogo
				xmlns="http://www.w3.org/2000/svg"
				width="100%"
				height="100%"
				viewBox="0 0 299 81"
				version="1.1"
			>
				<path d="M 283.003906 38.558594 L 298.996094 81 C 294.285156 80.324219 289.574219 79.480469 284.773438 78.71875 L 275.765625 55.265625 L 266.507812 76.78125 C 261.960938 76.023438 257.496094 75.765625 252.953125 75.175781 L 269.199219 38.050781 L 254.46875 0 L 268.105469 0 L 276.355469 21.261719 L 285.195312 0 L 298.996094 0 Z M 243.695312 0 L 231.320312 0 L 231.320312 73.574219 C 235.359375 73.828125 239.570312 73.996094 243.695312 74.5 Z M 220.628906 72.730469 C 209.351562 71.96875 198.070312 71.296875 186.539062 71.042969 L 186.539062 0 L 199.164062 0 L 199.164062 59.0625 C 206.402344 59.230469 213.640625 59.820312 220.628906 60.15625 Z M 173.070312 28.773438 L 173.070312 41.425781 L 155.816406 41.425781 L 155.816406 70.199219 L 143.355469 70.199219 L 143.355469 0 L 178.710938 0 L 178.710938 12.65625 L 155.816406 12.65625 L 155.816406 28.773438 Z M 122.140625 12.65625 L 122.140625 70.875 C 117.933594 70.875 113.640625 70.875 109.515625 71.042969 L 109.515625 12.65625 L 96.46875 12.65625 L 96.46875 0 L 135.273438 0 L 135.273438 12.65625 Z M 82.832031 42.101562 C 77.277344 42.101562 70.710938 42.101562 65.996094 42.355469 L 65.996094 61.171875 C 73.402344 60.664062 80.8125 60.074219 88.300781 59.820312 L 88.300781 71.96875 L 53.367188 74.757812 L 53.367188 0 L 88.300781 0 L 88.300781 12.65625 L 65.996094 12.65625 L 65.996094 29.699219 C 70.878906 29.699219 78.371094 29.445312 82.832031 29.445312 Z M 12.878906 35.015625 L 12.878906 79.226562 C 8.335938 79.734375 4.292969 80.324219 0 81 L 0 0 L 12.039062 0 L 28.453125 45.984375 L 28.453125 0 L 41.078125 0 L 41.078125 75.765625 C 36.617188 76.527344 32.074219 76.78125 27.273438 77.453125 Z M 12.878906 35.015625 " />
			</NetflixLogo>
		</Link>
	);
}

export default Logo;

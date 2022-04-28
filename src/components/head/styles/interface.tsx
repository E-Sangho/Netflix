export interface ISearch {
	$searching: boolean;
}

export interface IHeader {
	children: React.ReactNode;
	restProps: React.ReactNode;
}

export interface IHeaderLogo {
	to: string;
	src: string;
}

export interface IDropDown {
	Icon: React.ReactNode;
	Contents: React.ReactNode;
}

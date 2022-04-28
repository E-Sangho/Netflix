import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Series from "./Routes/Series";
import Movie from "./Routes/Movie";
import Latest from "./Routes/Latest";
import MyList from "./Routes/my-list";
import HeaderContainer from "./container/header";

function Router() {
	return (
		<BrowserRouter>
			<HeaderContainer />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/series" element={<Series />} />
				<Route path="/movies" element={<Movie />} />
				<Route path="/latest" element={<Latest />} />
				<Route path="/my-list" element={<MyList />} />
			</Routes>
		</BrowserRouter>
	);
}

export default Router;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Series from "./Routes/TvShows";
import Movie from "./Routes/Movie";
import Latest from "./Routes/Latest";
import MyList from "./Routes/my-list";
import Header from "./components/header/index";
import Search from "./Routes/Search";

function Router() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route
					path={`${process.env.PUBLIC_URL}/*`}
					element={<Home />}
				/>
				<Route
					path={`${process.env.PUBLIC_URL}/tvshows`}
					element={<Series />}
				/>
				<Route
					path={`${process.env.PUBLIC_URL}/movies`}
					element={<Movie />}
				/>
				<Route
					path={`${process.env.PUBLIC_URL}/latest`}
					element={<Latest />}
				/>
				<Route
					path={`${process.env.PUBLIC_URL}/list`}
					element={<MyList />}
				/>
				<Route
					path={`${process.env.PUBLIC_URL}/search`}
					element={<Search />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default Router;

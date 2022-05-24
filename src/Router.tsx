import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import TvShows from "./Routes/TvShows";
import Movies from "./Routes/Movie";
import Latest from "./Routes/Latest";
import MyList from "./Routes/my-list";
import Header from "./components/header/index";
import Search from "./Routes/Search";

function Router() {
	return (
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			<Header />
			<Routes>
				<Route path={`/*`} element={<Home />} />
				<Route path={`/tvshows/*`} element={<TvShows />} />
				<Route path={`/movies`} element={<Movies />} />
				<Route path={`/latest`} element={<Latest />} />
				<Route path={`/list`} element={<MyList />} />
				<Route path={`/search`} element={<Search />} />
			</Routes>
		</BrowserRouter>
	);
}

export default Router;

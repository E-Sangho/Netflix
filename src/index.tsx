import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "./theme";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { GlobalStyle } from "./components/GlobalStyle";

const client = new QueryClient();

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

root.render(
	<React.StrictMode>
		<RecoilRoot>
			<QueryClientProvider client={client}>
				<ThemeProvider theme={darkTheme}>
					<GlobalStyle />
					<App />
				</ThemeProvider>
			</QueryClientProvider>
		</RecoilRoot>
	</React.StrictMode>
);

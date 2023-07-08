import { BrowserRouter, Routes, Route } from "react-router-dom";

//Layouts
import AuthLayout from "./layouts/AuthLayout";

//Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import NewPassword from "./pages/NewPassword";
import ConfirmAccount from "./pages/ConfirmAccount";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<AuthLayout/>}>
					<Route index element={<Login/>}/>
					<Route path="register" element={<Register/>}/>
					<Route path="forgot-password" element={<ForgotPassword/>}/>
					<Route path="forgot-password/:token" element={<NewPassword/>}/>
					<Route path="confirm/:token" element={<ConfirmAccount/>}/>

				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;

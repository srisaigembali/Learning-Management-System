import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { checkAuthService, loginUserService, registerUserService } from "@/services";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
	const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
	const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
	const [auth, setAuth] = useState({
		isAuthenticated: false,
		user: null,
	});

	const handleRegisterUser = async (e) => {
		e.preventDefault();
		const data = await registerUserService(signUpFormData);
	};

	const handleLoginUser = async (e) => {
		e.preventDefault();
		const data = await loginUserService(signInFormData);
		if (data.success) {
			sessionStorage.setItem("accessToken", JSON.stringify(data.data.token));
			setAuth({
				isAuthenticated: true,
				user: data.data.user,
			});
		} else {
			setAuth({
				isAuthenticated: false,
				user: null,
			});
		}
	};

	// check auth user
	useEffect(() => {
		const checkAuthUser = async () => {
			const data = await checkAuthService();
			if (data.success) {
				setAuth({
					isAuthenticated: true,
					user: data.data.user,
				});
			} else {
				setAuth({
					isAuthenticated: false,
					user: null,
				});
			}
		};
		checkAuthUser();
	}, []);

	console.log(auth);

	return (
		<AuthContext.Provider
			value={{
				signInFormData,
				setSignInFormData,
				signUpFormData,
				setSignUpFormData,
				handleRegisterUser,
				handleLoginUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

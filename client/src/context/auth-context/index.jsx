import { Skeleton } from "@/components/ui/skeleton";
import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { checkAuthService, loginUserService, registerUserService } from "@/services";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
	const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
	const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
	const [auth, setAuth] = useState({
		isAuthenticated: false,
		user: null,
	});
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	const handleRegisterUser = async (e) => {
		e.preventDefault();
		const data = await registerUserService(signUpFormData);
		navigate("/");
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

	const resetCredentials = () => {
		setAuth({
			isAuthenticated: false,
			user: null,
		});
	};

	// check auth user
	useEffect(() => {
		const checkAuthUser = async () => {
			try {
				const data = await checkAuthService();
				if (data.success) {
					setAuth({
						isAuthenticated: true,
						user: data.data.user,
					});
					setLoading(false);
				} else {
					setAuth({
						isAuthenticated: false,
						user: null,
					});
					setLoading(false);
				}
			} catch (error) {
				if (!error?.response?.data?.success) {
					setAuth({
						isAuthenticated: false,
						user: null,
					});
					setLoading(false);
				}
			}
		};
		checkAuthUser();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				signInFormData,
				setSignInFormData,
				signUpFormData,
				setSignUpFormData,
				handleRegisterUser,
				handleLoginUser,
				auth,
				resetCredentials,
			}}
		>
			{loading ? <Skeleton /> : children}
		</AuthContext.Provider>
	);
}

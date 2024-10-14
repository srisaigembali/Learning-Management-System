import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/auth-context";
import { useContext } from "react";

const StudentHomePage = () => {
	const { resetCredentials } = useContext(AuthContext);

	const handleLogout = () => {
		resetCredentials();
		sessionStorage.clear();
	};

	return (
		<div>
			HomePage
			<Button onClick={handleLogout}>Logout</Button>
		</div>
	);
};

export default StudentHomePage;

import CommonForm from "@/components/common-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signInFormControls, signUpFormControls } from "@/config";
import { AuthContext } from "@/context/auth-context";
import { GraduationCap } from "lucide-react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

const AuthPage = () => {
	const [activeTab, setActiveTab] = useState("signin");

	const {
		signInFormData,
		setSignInFormData,
		signUpFormData,
		setSignUpFormData,
		handleRegisterUser,
		handleLoginUser,
	} = useContext(AuthContext);

	const handleTabChange = (value) => {
		setActiveTab(value);
	};

	const checkIfSignInFormIsValid = () => {
		return signInFormData && signInFormData.email !== "" && signInFormData.password !== "";
	};

	const checkIfSignUpFormIsValid = () => {
		return (
			signUpFormData &&
			signUpFormData.username !== "" &&
			signUpFormData.email !== "" &&
			signUpFormData.password !== ""
		);
	};

	return (
		<div className='flex flex-col min-h-screen'>
			<header className='flex items-center border-b px-4 lg:px-6 h-14'>
				<Link
					to={"/"}
					className='flex items-center justify-center'
				>
					<GraduationCap className='h-8 w-8 mr-4' />
					<span className='font-extrabold text-xl'>LMS Learn</span>
				</Link>
			</header>
			<div className='flex justify-center items-center min-h-screen bg-background'>
				<Tabs
					value={activeTab}
					defaultValue='signin'
					onValueChange={handleTabChange}
					className='w-full max-w-md'
				>
					<TabsList className='grid w-full grid-cols-2'>
						<TabsTrigger value='signin'>Sign In</TabsTrigger>
						<TabsTrigger value='signup'>Sign Up</TabsTrigger>
					</TabsList>
					<TabsContent value='signin'>
						<Card className='p-6 space-y-2'>
							<CardHeader>
								<CardTitle>Sign into your account</CardTitle>
								<CardDescription>
									Enter your email and password to access your account
								</CardDescription>
							</CardHeader>
							<CardContent className='space-y-2'>
								<CommonForm
									formControls={signInFormControls}
									buttonText={"Sign In"}
									formData={signInFormData}
									setFormData={setSignInFormData}
									isButtonDisabled={!checkIfSignInFormIsValid()}
									handleSubmit={handleLoginUser}
								/>
							</CardContent>
						</Card>
					</TabsContent>
					<TabsContent value='signup'>
						<Card className='p-6 space-y-2'>
							<CardHeader>
								<CardTitle>Create a new account</CardTitle>
								<CardDescription>Enter your details to get started</CardDescription>
							</CardHeader>
							<CardContent className='space-y-2'>
								<CommonForm
									formControls={signUpFormControls}
									buttonText={"Sign Up"}
									formData={signUpFormData}
									setFormData={setSignUpFormData}
									isButtonDisabled={!checkIfSignUpFormIsValid()}
									handleSubmit={handleRegisterUser}
								/>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
};

export default AuthPage;

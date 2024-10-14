import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const AuthPage = () => {
	const [activeTab, setActiveTab] = useState("signin");

	const handleTabChange = (value) => {
		setActiveTab(value);
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
					<TabsContent value='signin'>Signin</TabsContent>
					<TabsContent value='signup'>Signup</TabsContent>
				</Tabs>
			</div>
		</div>
	);
};

export default AuthPage;

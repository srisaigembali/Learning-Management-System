import { GraduationCap, TvMinimalPlay } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { AuthContext } from "@/context/auth-context";
import { useContext } from "react";

const StudentViewCommonHeader = () => {
	const { resetCredentials } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleLogout = () => {
		resetCredentials();
		sessionStorage.clear();
	};

	return (
		<header className='flex items-center justify-between p-4 border-b relative'>
			<div className='flex items-center space-x-4'>
				<Link
					to={"/home"}
					className='flex items-center hover:text-black'
				>
					<GraduationCap className='h-8 w-8 mr-4' />
					<span className='font-extrabold md:text-xl text-[14px]'>LMS Learn</span>
				</Link>
				<div className='flex items-center space-x-1'>
					<Button
						variant='ghost'
						className='text-[14px] md:text-[16px] font-medium'
						onClick={() => navigate("/courses")}
					>
						Explore Courses
					</Button>
				</div>
			</div>
			<div className='flex items-center space-x-4'>
				<div className='flex gap-4 items-center'>
					<div
						className='flex gap-3 items-center cursor-pointer mr-5'
						onClick={() => navigate("/student-courses")}
					>
						<span className='font-extrabold md:text-xl text-[12px]'>My Courses</span>
						<TvMinimalPlay className='w-7 h-7' />
					</div>
					<Button onClick={handleLogout}>Logout</Button>
				</div>
			</div>
		</header>
	);
};

export default StudentViewCommonHeader;

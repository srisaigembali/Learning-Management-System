import { createContext, useState } from "react";

export const StudentContext = createContext(null);

export default function StudentProvider({ children }) {
	const [studentCoursesList, setStudentCoursesList] = useState([]);
	const [loadingState, setLoadingState] = useState(true);
	const [studentCourseDetails, setStudentCourseDetails] = useState(null);
	const [currentCourseDetailsId, setCurrentCourseDetailsId] = useState(null);
	const [studentBoughtCoursesList, setStudentBoughtCoursesList] = useState([]);
	const [studentCurrentCourseProgress, setStudentCurrentCourseProgress] = useState({});

	return (
		<StudentContext.Provider
			value={{
				studentCoursesList,
				setStudentCoursesList,
				loadingState,
				setLoadingState,
				studentCourseDetails,
				setStudentCourseDetails,
				currentCourseDetailsId,
				setCurrentCourseDetailsId,
				studentBoughtCoursesList,
				setStudentBoughtCoursesList,
				studentCurrentCourseProgress,
				setStudentCurrentCourseProgress,
			}}
		>
			{children}
		</StudentContext.Provider>
	);
}

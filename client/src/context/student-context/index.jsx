import { createContext, useState } from "react";

export const StudentContext = createContext(null);

export default function StudentProvider({ children }) {
	const [studentCoursesList, setStudentCoursesList] = useState([]);
	const [loadingState, setLoadingState] = useState(true);
	const [studentCourseDetails, setStudentCourseDetails] = useState(null);
	const [currentCourseDetailsId, setCurrentCourseDetailsId] = useState(null);

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
			}}
		>
			{children}
		</StudentContext.Provider>
	);
}

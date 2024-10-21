import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/auth/index.jsx";
import RouteGuard from "./components/route-guard";
import { useContext } from "react";
import { AuthContext } from "./context/auth-context";
import StudentHomePage from "./pages/student/home";
import StudentViewCommonLayout from "./components/student-view/CommonLayout";
import NotFoundPage from "./pages/not-found/index.jsx";
import InstructorDashboardPage from "./pages/instructor";
import AddNewCoursePage from "./pages/instructor/AddNewCourse.jsx";
import StudentCoursesPage from "./pages/student/courses/index.jsx";
import StudentCourseDetailsPage from "./pages/student/course-details/index.jsx";
import PaypalPaymentReturnPage from "./pages/student/payment-return/index.jsx";
import StudentBoughtCoursesPage from "./pages/student/student-courses/index.jsx";
import StudentCourseProgressPage from "./pages/student/course-progress/index.jsx";
import { Toaster } from "sonner";

function App() {
	const { auth } = useContext(AuthContext);
	return (
		<>
			<Toaster richColors />
			<Routes>
				<Route
					path='/auth'
					element={
						<RouteGuard
							element={<AuthPage />}
							authenticated={auth?.isAuthenticated}
							user={auth?.user}
						/>
					}
				/>
				<Route
					path='/instructor'
					element={
						<RouteGuard
							element={<InstructorDashboardPage />}
							authenticated={auth?.isAuthenticated}
							user={auth?.user}
						/>
					}
				/>
				<Route
					path='/instructor/create-course'
					element={
						<RouteGuard
							element={<AddNewCoursePage />}
							authenticated={auth?.isAuthenticated}
							user={auth?.user}
						/>
					}
				/>
				<Route
					path='/instructor/edit-course/:courseId'
					element={
						<RouteGuard
							element={<AddNewCoursePage />}
							authenticated={auth?.isAuthenticated}
							user={auth?.user}
						/>
					}
				/>
				<Route
					path='/'
					element={
						<RouteGuard
							element={<StudentViewCommonLayout />}
							authenticated={auth?.isAuthenticated}
							user={auth?.user}
						/>
					}
				>
					<Route
						path=''
						element={<StudentHomePage />}
					/>
					<Route
						path='home'
						element={<StudentHomePage />}
					/>
					<Route
						path='courses'
						element={<StudentCoursesPage />}
					/>
					<Route
						path='course/details/:id'
						element={<StudentCourseDetailsPage />}
					/>
					<Route
						path='payment-return'
						element={<PaypalPaymentReturnPage />}
					/>
					<Route
						path='student-courses'
						element={<StudentBoughtCoursesPage />}
					/>
					<Route
						path='course-progress/:id'
						element={<StudentCourseProgressPage />}
					/>
				</Route>
				<Route
					path='*'
					element={<NotFoundPage />}
				/>
			</Routes>
		</>
	);
}

export default App;

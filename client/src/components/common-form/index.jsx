import { Button } from "../ui/button";
import FormControls from "./FormControls";

const CommonForm = ({
	formControls,
	buttonText,
	formData,
	setFormData,
	isButtonDisabled,
	handleSubmit,
}) => {
	return (
		<form onSubmit={handleSubmit}>
			{/* render form controls here */}
			<FormControls
				formControls={formControls}
				formData={formData}
				setFormData={setFormData}
			/>
			<Button
				type='submit'
				className='mt-5 w-full'
				disabled={isButtonDisabled}
			>
				{buttonText || "Submit"}
			</Button>
		</form>
	);
};

export default CommonForm;

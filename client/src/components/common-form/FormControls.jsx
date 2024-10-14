import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";

const FormControls = ({ formControls = [], formData, setFormData }) => {
	const renderComponentByType = (controlItem) => {
		let element = null;
		const currentControlItemValue = formData[controlItem.name] || "";

		switch (controlItem.componentType) {
			case "input":
				element = (
					<Input
						id={controlItem.name}
						name={controlItem.name}
						placeholder={controlItem.placeholder}
						type={controlItem.type}
						value={currentControlItemValue}
						onChange={(e) =>
							setFormData({
								...formData,
								[controlItem.name]: e.target.value,
							})
						}
						autoComplete={controlItem.name === "password" ? "current-password" : controlItem.name}
					/>
				);
				break;
			case "textarea":
				element = (
					<Textarea
						id={controlItem.name}
						name={controlItem.name}
						placeholder={controlItem.placeholder}
						value={currentControlItemValue}
						onChange={(e) =>
							setFormData({
								...formData,
								[controlItem.name]: e.target.value,
							})
						}
					/>
				);
				break;
			case "select":
				element = (
					<Select
						value={currentControlItemValue}
						onValueChange={(value) =>
							setFormData({
								...formData,
								[controlItem.name]: value,
							})
						}
					>
						<SelectTrigger className='w-full'>
							<SelectValue placeholder={controlItem.label} />
						</SelectTrigger>
						<SelectContent>
							{controlItem.options && controlItem.options.length > 0
								? controlItem.options.map((optionItem) => (
										<SelectItem
											key={optionItem.id}
											value={optionItem.id}
										>
											{optionItem.label}
										</SelectItem>
								  ))
								: null}
						</SelectContent>
					</Select>
				);
				break;
			default:
				element = (
					<Input
						id={controlItem.name}
						name={controlItem.name}
						placeholder={controlItem.placeholder}
						type={controlItem.type}
						value={currentControlItemValue}
						onChange={(e) =>
							setFormData({
								...formData,
								[controlItem.name]: e.target.value,
							})
						}
					/>
				);
				break;
		}
		return element;
	};

	return (
		<div className='flex flex-col gap-3'>
			{formControls.map((controlItem) => (
				<div key={controlItem.name}>
					<Label htmlFor={controlItem.name}>{controlItem.label}</Label>
					{renderComponentByType(controlItem)}
				</div>
			))}
		</div>
	);
};

export default FormControls;

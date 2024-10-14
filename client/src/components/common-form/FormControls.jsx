import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";

const FormControls = ({ formControls = [], formData, setFormData }) => {
	const renderComponentByType = (controlItem) => {
		let element = null;

		switch (controlItem.componentType) {
			case "input":
				element = (
					<Input
						id={controlItem.name}
						name={controlItem.name}
						placeholder={controlItem.placeholder}
						type={controlItem.type}
					/>
				);
				break;
			case "textarea":
				element = (
					<Textarea
						id={controlItem.name}
						name={controlItem.name}
						placeholder={controlItem.placeholder}
					/>
				);
				break;
			case "select":
				element = (
					<Select>
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

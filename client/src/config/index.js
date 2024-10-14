export const signUpFormControls = [
	{
		name: "username",
		label: "User Name",
		placeholder: "Enter your user name",
		type: "text",
		componentType: "input",
	},
	{
		name: "email",
		label: "Email",
		placeholder: "Enter your email",
		type: "email",
		componentType: "input",
	},
	{
		name: "password",
		label: "Password",
		placeholder: "Enter your password",
		type: "password",
		componentType: "input",
	},
];

export const signInFormControls = [
	{
		name: "email",
		label: "Email",
		placeholder: "Enter your email",
		type: "email",
		componentType: "input",
	},
	{
		name: "password",
		label: "Password",
		placeholder: "Enter your password",
		type: "password",
		componentType: "input",
	},
];

export const initialSignUpFormData = {
	username: "",
	email: "",
	password: "",
};

export const initialSignInFormData = {
	email: "",
	password: "",
};

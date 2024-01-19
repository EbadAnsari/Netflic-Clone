export interface Variantinterface {
	to: string;
	name: string;
}

export interface BaseObject {
	[key: string]: string;
}

export type Prettify<T> = {
	[key in keyof T]: T[key];
} & {};
export type Nullable<T> = {
	[P in keyof T]: T[P] | null;
};

export interface SignIn {
	location: "/in/login";
	text: "Sign In";
}
export interface SignUp {
	location: "/in";
	text: "Sign Up";
}
export type SigningState = SignIn | SignUp;

export type CredentialError = {
	invalidCredentials?: boolean;
	errorFromServer?: boolean;
};

export type ActionReturn<T> = Promise<
	| {
			result:
				| {
						error: true;
						errorMessage: string;
						data: false;
				  }
				| { error: false; data: T };
	  }
	| Response
>;

export type PasswordAction =
	| {
			sucess: false;
			error: true;
			errorMessage: string;
	  }
	| {
			error: false;
			sucess: true;
			sucessData: { email?: string; password?: string };
	  };

export interface Time {
	second: number | undefined;
	minute: number | undefined;
	hour: number | undefined;
}

export type ThemeType = "light" | "dark" | "";

export type NavigateType = { current: 1 | 2 | 3 };

export interface UserInterface {
	email: string;
	password: string;
}

interface PremiumPlan {
	planType: "premium";
	resolution: "4K + HDR";
}

interface StandardPlan {
	planType: "standard";
	resolution: "1080p";
}

interface BasicPlan {
	planType: "basic";
	resolution: "720p";
}

interface MobilePlan {
	planType: "mobile";
	resolution: "480p";
}

export type PlanInterface = (
	| PremiumPlan
	| StandardPlan
	| BasicPlan
	| MobilePlan
) & {
	price: string;
	currencyType: string;
	duration: string;
	description: string[];
};

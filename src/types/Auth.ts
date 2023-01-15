export type RiotAuthResponse = {
	type: string;
	response: Response;
	country: string;
};

type Response = {
	mode: string;
	parameters: Parameters;
};

type Parameters = {
	uri: string;
};

export type RiotEntitlementResponse = {
	entitlements_token: string;
};

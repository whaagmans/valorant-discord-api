export function extractParamFromUrlHash(hash: string, param: string) {
	// Remove # from the string
	const hashString = hash.substring(1);
	return hashString
		.substring(hashString.search(`(?<=^|&)${param}=`))
		.split('&')[0]
		.split('=')[1];
}

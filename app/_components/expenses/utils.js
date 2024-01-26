export const getMonthyear = () => {
	const currentDate = new Date();

	const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
	const currentYear = currentDate.getFullYear();

	return "012024";
	//return currentMonth + "" + currentYear;
};

export const countTotalValue = (arr, prop) => {
	return arr.reduce((acc, obj) => acc + obj[prop], 0);
};

export const formatCurrency = (number) => {
	// Convert the number to a string with fixed 2 decimal places
	const formattedNumber = number.toFixed(2);

	// Split the number into integer and decimal parts
	const [integerPart, decimalPart] = formattedNumber.split(".");

	// Add commas for thousands separator
	const numberWithCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

	// Concatenate the formatted number with the currency symbol
	const formattedCurrency = `${numberWithCommas},-`;

	return formattedCurrency;
};

export const getDateFromTimestamp = (timestamp) => {
	const date = new Date(parseInt(timestamp));
	return date.getDate() + "." + date.getMonth() + 1 + ".";
};

export const getCreatorColor = (creator) => {
	return creator == "V" ? "#fd79a8" : "#74b9ff";
};

/**
 * 
 * @param {*} expectedParams params that should be there
 * @param {*} definedParams params to check
 * @returns 
 */
export const hasMissingParams = (expectedParams, definedParams) => {
    const missingParams = expectedParams.filter(expectedparam => definedParams[expectedparam] === undefined);
    return (missingParams.length > 0);
}

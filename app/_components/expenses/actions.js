"use server";

// Custom
import { hasMissingParams } from "./utils";

// Mock data
import { sections, expenses, sectionsTemplates } from "@/app/_lib/mockdata";

export const getSections = async (monthyear) => {
	try {
		if (!monthyear) {
			return { status: "NOK", message: "Missing monthyear param." };
		}

		return { status: "OK", message: "", data: sections };
	} catch (e) {
		return { status: "NOK", message: e.message };
	}
};

export const updateSection = async (_id, formData) => {
	const mandatoryProps = ["label", "budget"];

	try {
		if (hasMissingParams(mandatoryProps, formData)) {
			return {
				status: "NOK",
				message: `Missing all required parameters (present: ${JSON.stringify(
					formData
				)}, required: ${mandatoryProps.join(",")}).`,
			};
		}

		return {
			status: "OK",
			message: "",
		};
	} catch (e) {
		return { status: "NOK", message: e.message };
	}
};

export const getExpenses = async (monthyear) => {
	try {
		if (!monthyear) {
			return { status: "NOK", message: "Missing monthyear param." };
		}

		return { status: "OK", message: "", data: expenses };
	} catch (e) {
		return { status: "NOK", message: e.message };
	}
};

export const insertExpense = async (formDataUpdated) => {
	const mandatoryProps = [
		"amount",
		"label",
		"created_by",
		"created_on",
		"monthyear",
		"sectionID",
	];

	try {
		if (hasMissingParams(mandatoryProps, formDataUpdated)) {
			return {
				status: "NOK",
				message: `Missing all required parameters (present: ${JSON.stringify(
					formDataUpdated
				)}, required: ${mandatoryProps.join(",")}).`,
			};
		}

		return {
			status: "OK",
			message: "",
			data: { insertedID: crypto.randomUUID() },
		};
	} catch (e) {
		return { status: "NOK", message: e.message };
	}
};

export const updateExpense = async (_id, formData) => {
	const mandatoryProps = ["amount", "label", "created_by"];

	try {
		if (hasMissingParams(mandatoryProps, formData)) {
			return {
				status: "NOK",
				message: `Missing all required parameters (present: ${JSON.stringify(
					formData
				)}, required: ${mandatoryProps.join(",")}).`,
			};
		}

		return {
			status: "OK",
			message: "",
		};
	} catch (e) {
		return { status: "NOK", message: e.message };
	}
};

export const deleteExpense = async (_id) => {
	try {
		return {
			status: "OK",
			message: "",
		};
	} catch (e) {
		return { status: "NOK", message: e.message };
	}
};

export const getSectionsTemplates = async () => {
	try {
		return { status: "OK", message: "", data: sectionsTemplates };
	} catch (e) {
		return { status: "NOK", message: e.message };
	}
};

export const insertSections = async (sections) => {
	try {
		return { status: "OK", message: "" };
	} catch (e) {
		return { status: "NOK", message: e.message };
	}
};

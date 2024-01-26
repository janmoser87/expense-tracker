"use client";

// React
import { useEffect, useState } from "react";

// Custom
import { getMonthyear } from "./utils";
import {
	getSections,
	getExpenses,
	updateSection,
	insertExpense,
	updateExpense,
	deleteExpense,
	insertSections
} from "./actions";
import Section from "./Section";
import SectionModal from "./SectionModal";
import ExpenseModal from "./ExpenseModal";
import ExpensesSummary from "./ExpensesSummary";

// MUI
import { Stack, Button } from "@mui/joy";

const fetchSections = async () => {
	const result = await getSections(getMonthyear());
	if (result.status == "NOK") {
		console.log(result);
		return [];
	}
	return result.data;
};

const fetchExpenses = async () => {
	const result = await getExpenses(getMonthyear());
	if (result.status == "NOK") {
		console.log(result);
		return [];
	}
	return result.data;
};

export default function Expenses() {
	const [loading, setLoading] = useState(true);
	const [sections, setSections] = useState([]);
	const [expenses, setExpenses] = useState([]);
	const [editedSection, setEditedSection] = useState(null);
	const [editedExpense, setEditedExpense] = useState(null);
	const [showSectionModal, setShowSectionModal] = useState(false);
	const [showExpenseModal, setShowExpenseModal] = useState(false);

	const load = async () => {
		setLoading(true);
		const sections = await fetchSections();
		setSections(sections);
		const expenses = await fetchExpenses();
		setExpenses(expenses);
		setLoading(false);
	};

	useEffect(() => {
		load();
	}, []);

	const handleSectionUpdate = async (editedSection, formData) => {
		const result = await updateSection(editedSection._id, formData);
		if (result.status == "NOK") {
			console.log(result);
			return;
		}
		const sectionsUpdated = sections.map((section) => {
			if (section._id == editedSection._id) {
				return { ...section, ...formData };
			}
			return section;
		});
		setSections(sectionsUpdated);
	};

	const handleSectionInsert = async (formData) => {
		const monthyear = getMonthyear();
		const section = {
			...formData,
			monthyear
		}
		const result = await insertSections([section]);
		if (result.status == "NOK") {
			console.log(result);
			return;
		}
		// I know I should not do that :-)
		const sections = await fetchSections();
		setSections(sections);
	}

	const handleExpenseInsert = async (editedSection, formData) => {
		// Expense record to be valid needs more props than present on the form
		const formDataUpdated = {
			...formData,
			created_on: Date.now(),
			monthyear: getMonthyear(),
			sectionID: editedSection._id,
		};
		const result = await insertExpense(formDataUpdated);
		if (result.status == "NOK") {
			console.log(result);
			return;
		}
		const insertedID = result.data.insertedID;
		setExpenses([{ _id: insertedID, ...formDataUpdated }, ...expenses]);
		console.log(expenses);
	};

	const handleExpenseUpdate = async (editedExpense, formData) => {
		const result = await updateExpense(editedExpense._id, formData);
		if (result.status == "NOK") {
			console.log(result);
			return;
		}
		const expensesUpdated = expenses.map((expense) => {
			if (expense._id == editedExpense._id) {
				return {
					...expense,
					...formData,
				};
			}
			return expense;
		});
		setExpenses(expensesUpdated);
	};

	const handleExpenseDelete = async (editedExpense) => {
		const result = await deleteExpense(editedExpense._id);
		if (result.status == "NOK") {
			console.log(result);
			return;
		}
		const expensesUpdated = expenses.filter(
			(expense) => expense._id != editedExpense._id
		);
		setExpenses(expensesUpdated);
	};

	return (
		<>
			{loading ? (
				<Button loading variant="plain" />
			) : (
				<Stack spacing={2}>
					<ExpensesSummary expenses={expenses} />
					{sections.map((section) => {
						return (
							<Section
								key={section._id}
								section={section}
								expenses={expenses.filter(
									(expense) =>
										expense.sectionID == section._id
								)}
								onOpenSectionSettings={() => {
									setEditedSection(section);
									setShowSectionModal(true);
								}}
								onOpenAddExpense={() => {
									setEditedSection(section);
									setEditedExpense(null);
									setShowExpenseModal(true);
								}}
								onOpenEditExpense={(expense) => {
									setEditedExpense(expense);
									setShowExpenseModal(true);
								}}
							/>
						);
					})}
				</Stack>
			)}
			{showSectionModal ? (
				<SectionModal
					section={editedSection}
					opened={showSectionModal}
					onModalClose={() => {
						setShowSectionModal(false);
					}}
					onModalSubmit={(formData) => {
						if (editedSection) {
							// Updating
							handleSectionUpdate(editedSection, formData);
							return;
						}
						// Inserting
						handleSectionInsert(formData);						
					}}
				/>
			) : null}
			{showExpenseModal ? (
				<ExpenseModal
					expense={editedExpense}
					opened={showExpenseModal}
					onModalClose={() => {
						setShowExpenseModal(false);
					}}
					onModalSubmit={(formData) => {
						if (editedExpense) {
							handleExpenseUpdate(editedExpense, formData);
							return;
						}
						handleExpenseInsert(editedSection, formData);
					}}
					onModalDelete={() => {
						handleExpenseDelete(editedExpense);
					}}
				/>
			) : null}
		</>
	);
}

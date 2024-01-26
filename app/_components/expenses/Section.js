"use client";

// MUI
import { Card } from "@mui/joy";

// React
import { useState } from "react";

// Custom
import { countTotalValue } from "./utils";
import SectionHeader from "./SectionHeader";
import SectionSubheader from "./SectionSubheader";
import SectionExpenses from "./SectionExpenses";

export default function Section({
	section,
	expenses,
	onOpenSectionSettings,
	onOpenAddExpense,
	onOpenEditExpense
}) {
	// Total amount calculation
	const expensesSpent = countTotalValue(expenses, "amount");

	const [showExpenses, setShowExpenses] = useState(false);

	return (
		<>
			<Card variant="soft" size="sm" sx={{px: 2}}>
				<SectionHeader
					section={section}
					onSectionSettingsClick={() => { onOpenSectionSettings(); }}
					onAddExpenseClick={() => { onOpenAddExpense(); }}
				/>
				<SectionSubheader
					expensesSpent={expensesSpent}
					expensesBudget={section.budget}
					toggleState={showExpenses}
					onToggleClick={() => {
						setShowExpenses(!showExpenses);
					}}
				/>
				{showExpenses ? (
					<SectionExpenses
						expenses={expenses}
						onExpenseEditRequested={(expense) => { onOpenEditExpense(expense); }}
					/>
				) : null}
			</Card>
		</>
	);
}

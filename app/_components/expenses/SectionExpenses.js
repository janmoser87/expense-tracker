"use client";

// MUI
import { CardContent, Stack, Typography, List, ListDivider} from "@mui/joy";

// Custom
import SectionExpensesListItem from "./SectionExpensesListItem";

export default function SectionExpenses({ expenses, onExpenseEditRequested }) {
	return (
		<CardContent sx={{ backgroundColor: "white" }}>
			{expenses.length == 0 ? (
				<Stack direction="row" sx={{ p: 1 }} justifyContent="center">
					<Typography level="body-sm">No expenses yet</Typography>
				</Stack>
			) : (
				<List aria-labelledby="decorated-list-demo">
					{expenses.map((expense) => {
						return (
							<div key={expense._id}>
								<SectionExpensesListItem
									expense={expense}
									onExpenseDblClick={() => {
										onExpenseEditRequested(expense);
									}}
								/>
								<ListDivider inset="gutter" />
							</div>
						);
					})}
				</List>
			)}
		</CardContent>
	);
}

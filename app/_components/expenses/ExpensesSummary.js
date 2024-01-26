"use client";

// MUI
import { Stack, Button, Card } from "@mui/joy";

// Custom
import { getMonthyear, formatCurrency } from "./utils";

// Icons
import { CalendarMonth, Paid } from "@mui/icons-material";

export default function ExpensesSummary({ expenses }) {
	const totalAmount = expenses.reduce((agg, curr) => {
		return agg + curr.amount;
	}, 0);

	const monthyear = getMonthyear();

	return (
		<Card>
			<Stack direction="row" justifyContent="space-between">
				<Button disabled startDecorator={<CalendarMonth />}>
					{monthyear.slice(0, 2) + "/" + monthyear.slice(2)}
				</Button>
				<Button disabled startDecorator={<Paid />}>{formatCurrency(totalAmount)}</Button>
			</Stack>
		</Card>
	);
}

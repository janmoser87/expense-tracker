"use client";

// MUI
import { Stack, Button, Typography, Chip, Box } from "@mui/joy";

// Icon
import { ExpandLess, ExpandMore, AllInclusive } from "@mui/icons-material";

// Custom
import { formatCurrency } from "./utils";

export default function SectionSubheader({
	section,
	toggleState = true,
	onToggleClick,
	expensesSpent = 0,
	expensesBudget = 0,
}) {
	let expensesSpentPrc = 0;
	let expensesSpentPrcColor = "";
	if (expensesBudget) {
		expensesSpentPrc = (expensesSpent / expensesBudget) * 100;

		expensesSpentPrcColor =
			expensesSpentPrc < 25
				? "#55efc4"
				: expensesSpentPrc < 50
				? "#ffeaa7"
				: "#ff7675";
	}

	return (
		<Stack
			direction="row"
			justifyContent="space-between"
			alignItems="center"
		>
			<Button
				variant="plain"
				onClick={() => {
					onToggleClick();
				}}
			>
				{toggleState ? <ExpandLess /> : <ExpandMore />}
			</Button>
			<Stack direction="row" justifyContent="flex-end" spacing={1}>
				<Typography level="body-sm">
					{formatCurrency(expensesSpent)}
				</Typography>
				{expensesBudget > 0 ? (
					<>
						<Typography level="body-sm"> / </Typography>
						<Typography level="body-sm">
							{formatCurrency(expensesBudget)}
						</Typography>
						<Typography level="body-sm" component={"div"}>
							<Chip
								size="sm"
								sx={{ backgroundColor: expensesSpentPrcColor }}
							>
								{Math.ceil(expensesSpentPrc)} %
							</Chip>
						</Typography>
					</>
				) : null}
			</Stack>
		</Stack>
	);
}

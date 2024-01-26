"use client";

// MUI
import { ListItem, Grid, Typography, Chip } from "@mui/joy";

// Custom
import { getCreatorColor, formatCurrency, getDateFromTimestamp } from "./utils";

export default function SectionExpensesListItem({
	expense,
	onExpenseDblClick,
}) {
	return (
		<>
			<ListItem
				onClick={(e) => {
					if (e.detail === 2) {
						onExpenseDblClick();
					}
				}}
			>
				<Grid
					display="flex"
					alignItems="center"
					container
					spacing={2}
					sx={{ flexGrow: 1 }}
				>
					<Grid xs={3}>
						<Typography level="body-sm">
							{getDateFromTimestamp(expense.created_on)}
						</Typography>
					</Grid>
					<Grid xs={3}>
						<Typography level="body-sm">
							{formatCurrency(expense.amount)}
						</Typography>
					</Grid>
					<Grid xs={4}>
						<Typography level="body-sm">{expense.label}</Typography>
					</Grid>
					<Grid xs={2}>
						<Chip
							size="sm"
							sx={{
								backgroundColor: getCreatorColor(
									expense.created_by
								),
							}}
						>
							<Typography level="body-xs">
								{expense.created_by}
							</Typography>
						</Chip>
					</Grid>
				</Grid>
			</ListItem>
		</>
	);
}

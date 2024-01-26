"use client";

// MUI
import { Stack, Button, Typography } from "@mui/joy";

// Icon
import { Add, Settings } from "@mui/icons-material";

export default function SectionHeader({
	section,
	onSectionSettingsClick,
	onAddExpenseClick,
}) {
	return (
		<Stack
			direction="row"
			justifyContent="space-between"
			alignItems="center"
		>
			<Stack direction="row" alignItems="center">
				<Typography level="title-lg">{section.label}</Typography>
			</Stack>
			<Stack direction="row" alignItems="center">
				<Button
					variant="plain"
					onClick={() => {
						onSectionSettingsClick();
					}}
				>
					<Settings />
				</Button>
				<Button
					size="sm"
					color="primary"
					onClick={() => {
						onAddExpenseClick();
					}}
				>
					<Add />
				</Button>
			</Stack>
		</Stack>
	);
}

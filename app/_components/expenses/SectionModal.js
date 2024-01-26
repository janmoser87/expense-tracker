"use client";

// MUI
import {
	Modal,
	ModalDialog,
	ModalClose,
	Stack,
	FormControl,
	FormLabel,
	Input,
	Button,
	Card,
	Typography,
} from "@mui/joy";

// Icons
import { InfoOutlined } from "@mui/icons-material";

// React
import { useState } from "react";

export default function SectionModal({
	opened,
	section,
	onModalClose,
	onModalSubmit,
}) {
	const [formData, setFormData] = useState({
		label: section?.label || "",
		budget: section?.budget || "",
	});

	return (
		<Modal
			open={opened}
			onClose={() => {
				onModalClose();
			}}
		>
			<ModalDialog>
				<ModalClose />
				<form
					onSubmit={async (event) => {
						event.preventDefault();
						onModalSubmit(formData);
						onModalClose();
					}}
				>
					<Stack spacing={2}>
						<FormControl>
							<FormLabel>Label</FormLabel>
							<Input
								type="text"
								value={formData.label}
								onChange={(e) => {
									setFormData({
										...formData,
										label: e.target.value,
									});
								}}
								autoFocus
								required
							/>
						</FormControl>
						<FormControl>
							<FormLabel>Budget</FormLabel>
							<Input
								value={formData.budget}
								onChange={(e) => {
									setFormData({
										...formData,
										budget: parseInt(e.target.value),
									});
								}}
								endDecorator={<Button disabled>Kč</Button>}
								required
							/>
						</FormControl>
						<Card variant="soft" color="warning">
							<Stack direction="row" spacing={2}>
								<InfoOutlined />
								<Typography level="body-sm">
									This change will affect only current month.
								</Typography>
							</Stack>
						</Card>
						<Button type="submit">
							{section ? "Save" : "Insert"}
						</Button>
					</Stack>
				</form>
			</ModalDialog>
		</Modal>
	);
}

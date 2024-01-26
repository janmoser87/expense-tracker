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
	Switch,
	Chip,
	Card,
	Typography,
	Checkbox,
} from "@mui/joy";

// React
import { useState, useEffect } from "react";

// Custom
import { getCreatorColor } from "./utils";

export default function ExpenseModal({
	opened,
	expense,
	onModalClose,
	onModalSubmit,
	onModalDelete,
}) {
	const [formData, setFormData] = useState({
		amount: "",
		label: "",
		created_by: "H",
	});

	const [confirmDelete, setConfirmDelete] = useState(false);
	const [stayAfterSubmit, setStayAfterSubmit] = useState(false);

	useEffect(() => {
		if (expense) {
			setFormData({
				amount: expense.amount,
				label: expense.label,
				created_by: expense.created_by,
			});
		}
	}, []);

	const resetFormData = () => {
		setFormData({
			amount: "",
			label: "",
			created_by: formData.created_by,
		});
	};

	return (
		<Modal
			open={opened}
			onClose={() => {
				onModalClose();
			}}
		>
			<ModalDialog sx={{ top: "200px" }}>
				<ModalClose />
				<form
					onSubmit={async (event) => {
						event.preventDefault();
						onModalSubmit(formData);
						if (stayAfterSubmit) {
							resetFormData();
							return;
						}
						onModalClose();
					}}
				>
					<Stack spacing={2}>
						<FormControl>
							<FormLabel>Amount</FormLabel>
							<Input
								type="number"
								value={formData.amount}
								onChange={(e) => {
									const amount =
										e.target.value == ""
											? 0
											: parseInt(e.target.value);
									setFormData({
										...formData,
										amount,
									});
								}}
								endDecorator={<Button disabled>Kč</Button>}
								autoFocus
								required
							/>
						</FormControl>
						<FormControl>
							<FormLabel>Label</FormLabel>
							<Input
								value={formData.label}
								onChange={(e) => {
									setFormData({
										...formData,
										label: e.target.value,
									});
								}}
								required
							/>
						</FormControl>
						<Stack direction="row" justifyContent="center">
							<Switch
								startDecorator={
									<Chip
										size="sm"
										sx={{
											backgroundColor:
												getCreatorColor("H"),
										}}
									>
										H
									</Chip>
								}
								endDecorator={
									<Chip
										size="sm"
										sx={{
											backgroundColor:
												getCreatorColor("V"),
										}}
									>
										V
									</Chip>
								}
								color="neutral"
								checked={
									formData.created_by == "V" ? true : false
								}
								onChange={(e) => {
									setFormData({
										...formData,
										created_by:
											e.target.checked == true
												? "V"
												: "H",
									});
								}}
							/>
						</Stack>
						<Button type="submit">
							{expense ? "Save" : "Insert"}
						</Button>
						{!expense ? (
							<Card variant="soft" color="warning">
								<Stack direction="row" spacing={2}>
									<Checkbox
										checked={stayAfterSubmit}
										onChange={(event) => {
											setStayAfterSubmit(
												event.target.checked
											);
										}}
										label="Stay to insert another one"
									/>
								</Stack>
							</Card>
						) : null}
						{expense ? (
							<>
								{!confirmDelete ? (
									<Button
										size="md"
										variant="solid"
										color="danger"
										onClick={(e) => {
											setConfirmDelete(true);
										}}
									>
										Delete
									</Button>
								) : (
									<Button
										size="md"
										variant="solid"
										color="danger"
										onClick={async (e) => {
											onModalDelete();
											onModalClose();
										}}
									>
										Confirm delete
									</Button>
								)}
							</>
						) : null}
					</Stack>
				</form>
			</ModalDialog>
		</Modal>
	);
}

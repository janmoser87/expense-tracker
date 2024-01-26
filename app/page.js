// MUI
import { Stack } from "@mui/joy";

// Custom
import Expenses from "./_components/expenses/Expenses";

export default function Home() {
	return (
		<Stack sx={{ p: 2 }}>
			<Expenses />
		</Stack>
	);
}

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalService";

const initialState = {
	goals: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

// Get user goals;  '_' as 1st param is placeholder -- we're not sending any params
export const getGoals = createAsyncThunk(
	"goals/getAll",
	async (_, thunkAPI) => {
		try {
			// these are protected routes, so we need to send JWT
			const token = thunkAPI.getState().auth.user.token; // thunkAPI has getSTate() to get whatever we need from state (e.g. user token)
			return await goalService.getGoals(token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message); // will reject & pass in the message as the payload
		}
	}
);

// Create new goal
export const createGoal = createAsyncThunk(
	"goals/create",
	async (goalData, thunkAPI) => {
		try {
			// these are protected routes, so we need to send JWT
			const token = thunkAPI.getState().auth.user.token; // thunkAPI has getSTate() to get whatever we need from state (e.g. user token)
			return await goalService.createGoal(goalData, token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message); // will reject & pass in the message as the payload
		}
	}
);

// Delete user goal
export const deleteGoal = createAsyncThunk(
	"goals/delete",
	async (id, thunkAPI) => {
		try {
			// these are protected routes, so we need to send JWT
			const token = thunkAPI.getState().auth.user.token; // thunkAPI has getSTate() to get whatever we need from state (e.g. user token)
			return await goalService.deleteGoal(id, token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message); // will reject & pass in the message as the payload
		}
	}
);

// async functions will go in extraReducers
export const goalSlice = createSlice({
	name: "goal",
	initialState,
	reducers: {
		reset: (state) => initialState, // resets all state fields back to initial state
	},
	extraReducers: (builder) => {
		builder
			.addCase(createGoal.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createGoal.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.goals.push(action.payload);
			})
			.addCase(createGoal.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getGoals.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getGoals.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.goals = action.payload;
			})
			.addCase(getGoals.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(deleteGoal.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteGoal.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.goals = state.goals.filter(
					(goal) => goal._id !== action.payload.id
				); // action.payload.id = deleted item id
			})
			.addCase(deleteGoal.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
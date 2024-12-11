import { useAppDispatch, useAppSelector } from '../../store/store';
import { GridData, tick } from './gameSlice';

export const useGameRules = () => {
	const dispatch = useAppDispatch();
	const { gridData } = useAppSelector((state) => state.game);

	const handleGameTick = () => {
		const newState = calculateTick(gridData);
		dispatch(tick(newState));
	};

	return { handleGameTick };
};


function calculateTick(data: GridData): GridData{
	

	return data;
}
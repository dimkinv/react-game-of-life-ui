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
	const newGrid: GridData = [];

	for(let i = 0; i < data.length; i++){
		for (let j = 0; j < data[i].length; j++) {
			const element = data[i][j];

			let liveNeighbors = 0;
			for (const vector of vectors){
				const neighbor = data[i + vector[1]]?.[j + vector[0]]
				if(neighbor){
					liveNeighbors++;
				}
			}

			const newState = calculateState(element, liveNeighbors);
			newGrid[i] = newGrid[i] ?? [];
			newGrid[i][j] = newState;
		}
	}

	return newGrid;
}

function calculateState(currentState:boolean, liveNeighbors: number) {
	if(liveNeighbors < 2){
		return false;
	} else if (currentState && (liveNeighbors === 2 || liveNeighbors === 3) ){
		return true;
	} else if(liveNeighbors > 3){
		return false;
	} else if (!currentState && liveNeighbors === 3){
		return true;
	}

	return currentState;
}

const vectors: [number,number][] = [
	[-1, -1],
	[0, -1],
	[1, -1],
	[1, 0],
	[1, 1],
	[0, 1],
	[-1, 1],
	[-1, 0]
]
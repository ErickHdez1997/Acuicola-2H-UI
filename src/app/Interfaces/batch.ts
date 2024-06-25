import { FishTank } from "./fish-tank";
import { TankMeasurement } from "./tank-measurement";

export interface Batch {
    id: number;
    fishTank: FishTank;
    startDate: string;
    endDate: string;
    inProgress: boolean;
    fishPlanted: number;
    fishYield: number;
    measurements: TankMeasurement[];
}

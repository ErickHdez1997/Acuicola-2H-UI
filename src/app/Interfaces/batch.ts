import { TankMeasurement } from "./tank-measurement";

export interface Batch {
    id: number;
    fishTankId: number;
    batchNotes: string;
    startDate: string;
    endDate: string;
    inProgress: boolean;
    fishPlanted: number;
    fishYield: number;
    measurements: TankMeasurement[];
}

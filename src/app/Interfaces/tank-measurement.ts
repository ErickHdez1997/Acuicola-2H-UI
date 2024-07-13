export interface TankMeasurement {
    id: MeasurementId;
    fishTankId: number;
    oxygen: number;
    ph: number;
    temperature: number;
    salinity: number;
    nitrate: number;
    nitrite: number;
    ammonia: number;
    turbine: number;
    alkalinity: number;
    deaths: number;
    date: string;
}

export interface MeasurementId {
    measurementId: number;
    batchId: number;
}
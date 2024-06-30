export interface TankMeasurement {
    id: number;
    batchId: number;
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

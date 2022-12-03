import EventEmitter from 'eventemitter3';
type CategoricalChartState = import('../chart/generateCategoricalChart').CategoricalChartState;
interface EventCenter extends EventEmitter<EventTypes> {
    setMaxListeners?(maxListeners: number): void;
    _maxListeners?: number;
}
declare const eventCenter: EventCenter;
export { eventCenter };
export declare const SYNC_EVENT = "recharts.syncMouseEvents";
type SYNC_EVENT = typeof SYNC_EVENT;
interface EventTypes {
    [SYNC_EVENT](syncId: number | string, uniqueChartId: string, data: CategoricalChartState): void;
}

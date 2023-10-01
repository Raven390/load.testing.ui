import {Instance, types} from "mobx-state-tree";
import {DateTime} from "luxon";

const MetricEntry = types.model({
    timestamp: types.string, // Строка для хранения даты и времени в формате ISO
    value: types.number,
}).views(self => ({
    get dateTime() {
        return DateTime.fromISO(self.timestamp);
    },
}));

const MetricsMap = types.model({
    init: types.array(MetricEntry),
    committed: types.array(MetricEntry),
    max: types.array(MetricEntry),
    used: types.array(MetricEntry),
});

const ResponseStatusMetricMap = types.map(types.number);

export const MetricsModel = types.model("MetricsModel", {
    memoryMetricsMap: MetricsMap,
    responseStatusMetricMap: ResponseStatusMetricMap,
});

export type IMetricsModel = Instance<typeof MetricsModel>;
export type RecentCalculation = {
    route: string;
    startingPoint: string;
    endingPoint: string;
    passengerAmount: number | string;
    type: string;
    bill: string;
    farePerPerson: number | string;
    totalFare: number | string;
    timestamp: number;
}

const STORAGE_KEY = "recentCalculations";
const MAX_RECENT = 5;

export function saveRecentCalculation({ route, startingPoint, endingPoint, passengerAmount, type, bill, farePerPerson, totalFare }: RecentCalculation) {
    const stored = localStorage.getItem(STORAGE_KEY);

    const calculations: RecentCalculation[] = stored ? JSON.parse(stored) : [];


    const filtered = calculations.filter((calculation) => {
        return !(calculation.route === route &&
            calculation.startingPoint === startingPoint &&
            calculation.endingPoint === endingPoint &&
            calculation.passengerAmount === passengerAmount &&
            calculation.type === type &&
            calculation.bill === bill &&
            calculation.farePerPerson === farePerPerson &&
            calculation.totalFare === totalFare);
    });

    filtered.unshift({ route, startingPoint, endingPoint, passengerAmount, type, bill, farePerPerson, totalFare, timestamp: Date.now() });

    const limited = filtered.slice(0, MAX_RECENT);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(limited));
}
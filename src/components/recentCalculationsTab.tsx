import CalculationCard from "./calculationCard";

import { type RecentCalculation } from "@utils/recentCalculations";

type RecentCalculationsTabProps = {
    calculations: RecentCalculation[];
    onSelect: (calculation: RecentCalculation) => void;
    onClear: () => void;
}


export default function RecentCalculationsTab({ calculations, onSelect, onClear }: RecentCalculationsTabProps) {
     return (
        <>
            <div className=" my-10 mx-auto max-w-4xl overflow-hidden h-126 w-full flex flex-col border border-border rounded-md">

                <div className="w-full flex justify-between items-center mb-2 px-8 py-4 shrink-0">
                    <div>
                        <h2 className="font-main text-lg text-white font-semibold">Recent Calculations</h2>
                        <span className='font-main text-white/80 text-sm mb-4'>Your latest fare calculations</span>
                    </div>

                    <button onClick={onClear} className="*:font-main text-secondary font-semibold cursor-pointer hover:underline">Clear All</button>
                </div>

                <hr className="border-t border-t-border w-full shrink-0"  />

                <div className="w-full flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent p-4">
                     {calculations?.length === 0 && (
                         <div className="w-full h-full flex justify-center items-center">
                             <span className="font-main text-white/80 text-sm text-center my-auto p-8">No recent calculations</span>
                         </div>
                     )}

                     {calculations?.map((calculation) => (
                         <CalculationCard
                             key={calculation.timestamp}
                             startingPoint={calculation.startingPoint}
                             endingPoint={calculation.endingPoint}
                             routeId={calculation.route}
                             passengerAmount={calculation.passengerAmount}
                             type={calculation.type}
                             bill={calculation.bill}
                             farePerPerson={calculation.farePerPerson}
                             totalFare={calculation.totalFare}
                             timestamp={calculation.timestamp}
                             onClick={onSelect}
                         />
                     ))}
                </div>
            </div>
        </>
     )
}
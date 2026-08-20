import formatElapsedTime from "@utils/formatElapsedTime";

type CalculationCardProps = {
    startingPoint: string;
    endingPoint: string;
    route: string;
    passengerAmount: number | string;
    type: string;
    bill: string;
    farePerPerson: number | string;
    totalFare: number | string;
    timestamp: number;
}

export default function CalculationCard({
    startingPoint, endingPoint, route, passengerAmount, type, bill, farePerPerson, totalFare, timestamp

    
}: CalculationCardProps) {

    

    return (
        <>
            <button className="relative mt-4 w-full min-h-14 px-4 py-2 border border-border rounded-md bg-secondary/15 cursor-pointer hover:bg-secondary/20 transition-colors">
                <div className="flex justify-between items-center w-full h-full">
                    <span className="font-main font-semibold text-white text-lg">{startingPoint} →  {endingPoint}</span>
                    <span className="font-main text-white/80 text-lg font-semibold">₱{totalFare}</span>
                </div>
                <div className="flex justify-between items-center w-full h-full mb-3">
                    <span className="font-main text-white/80">{route}</span>
                    <span className="font-main text-white/80">₱{farePerPerson}/person</span>
                </div>

                <span className="font-main text-white/80 text-sm text-left block"> {passengerAmount} {type} passenger(s) · ₱{bill} bill</span>
                <span className="font-main text-white/80 text-sm text-left block">{formatElapsedTime(timestamp)}</span>
            </button>
        </>
    )
}
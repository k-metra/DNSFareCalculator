import formatElapsedTime from "@utils/formatElapsedTime";
import { routes } from "../data/routes";
import { motion, AnimatePresence } from "motion/react";

type CalculationCardProps = {
    startingPoint: string;
    endingPoint: string;
    routeId: string;
    passengerAmount: number | string;
    type: string;
    bill: string;
    farePerPerson: number | string;
    totalFare: number | string;
    timestamp: number;
    onClick: () => void;
}

export default function CalculationCard({
    startingPoint, endingPoint, routeId, passengerAmount, type, bill, farePerPerson, totalFare, timestamp, onClick

    
}: CalculationCardProps) {

    const routeData = routes.find((route) => route.id === routeId);

    const routeName = routeData ? routeData.name : "Unknown Route";
    const startingPointName = routeData ? routeData.stops.find((stop) => stop.id === startingPoint)?.name : "Unknown Start";
    const endingPointName = routeData ? routeData.stops.find((stop) => stop.id === endingPoint)?.name : "Unknown Stop";


    return (
        <>
            <motion.button initial="initial" whileHover="hover" onClick={() => {
                onClick();
            }} className="relative mt-4 w-full min-h-14 px-4 py-2 border border-border rounded-md bg-secondary/15 cursor-pointer hover:bg-secondary/20 transition-colors">
                <div className="flex justify-between items-center w-full h-full">
                    <span className="font-main font-semibold text-white text-lg text-left">{startingPointName} →  {endingPointName}</span>
                    <span className="font-main text-white/80 text-lg font-semibold">₱{totalFare}</span>
                </div>
                <div className="flex justify-between items-center w-full h-full mb-3">
                    <span className="font-main text-white/80">{routeName}</span>
                    <span className="font-main text-white/80">₱{farePerPerson}/person</span>
                </div>

                <span className="font-main text-white/80 text-sm text-left block"> {passengerAmount} {type} passenger(s) · ₱{bill} bill</span>
                <span className="font-main text-white/80 text-sm text-left block">{formatElapsedTime(timestamp)}</span>

                <AnimatePresence>

                    <motion.i 
                        variants={{
                            initial: { opacity: 0, y: "100%" },
                            hover: { opacity: 1, y: "0%" },
                            
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                            opacity: { duration: 0.2 }
                        }}
                        className="text-2xl text-secondary fa-solid fa-arrow-up-right-from-square absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"></motion.i>

                </AnimatePresence>

            </motion.button>
        </>
    )
}
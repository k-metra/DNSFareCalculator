import { fareRules } from "../data/fares";
import { type PassengerType } from "./types";

const calculateFare = (passengerType: PassengerType, numOfPassengers: number, bill: number, startingIndex: number, endingIndex: number) => {

    const fareRule = fareRules[passengerType];
    const minimumFare = fareRule.minimum;
    const fareIncrement = fareRule.increment;

    let farePerPerson = minimumFare;
    
    const distance = Math.abs(endingIndex - startingIndex);

    if (distance > 3) {
        farePerPerson += (fareIncrement * (distance - 3));
    }

    const totalFare = farePerPerson * numOfPassengers;

    const change = (bill - totalFare);

    return {
        farePerPerson: farePerPerson,
        change: change,
        totalFare: totalFare
    };

}

export default calculateFare;
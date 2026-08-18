import { fareRules } from "../data/fares";

export type option = {
    value: string;
    label: string;
}

export type PassengerType = keyof typeof fareRules;
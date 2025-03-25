import { Quest } from "./questData";

export interface User {
    id: string | number;
    email: string;
    username: string;
    joys: number;
    quests?: Quest[]; 
}
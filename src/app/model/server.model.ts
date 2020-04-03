import { OS } from './os.model';


export interface Server {
    id: number;
    hostname: string;
    domain: string;
    os: OS;
}
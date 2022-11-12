export interface GetProfileStatusResponseData {
    maxPveCountExceeded: false;
    profiles: ProserverItem[];
}
export interface ProserverItem {
    profileid: string;
    profileToken: string;
    status: string;
    sid: string;
    ip: string;
    port: number;
}

export class Client {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}

export interface IClient {
    clientId: number;
    clientName: string;
}
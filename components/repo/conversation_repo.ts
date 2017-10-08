import Conversation from "./conversation";

export default class ConversationRepo implements Conversation {

    // tslint:disable-next-line:member-access
    id: number;
    // tslint:disable-next-line:member-access
    userId: string;
    // tslint:disable-next-line:member-access
    direction: "incoming" | "outgoing";
    // tslint:disable-next-line:member-access
    message: string;
    // tslint:disable-next-line:member-access
    timestamp: number;
    // tslint:disable-next-line:member-access
    store: any;

    constructor(store: any) {
        this.store = store;
    }

    /**
     *
     * @param id conversation primary key
     */
    // tslint:disable-next-line:member-access
    async get(id: number): Promise<Conversation> {
        let partialData = await this.store.get(id);
        let data = {
            id : partialData.id,
            userId: partialData.userId,
            direction: partialData.direction,
            message: partialData.message,
            timestamp: partialData.timestamp
        };
        return data;
    }
    // tslint:disable-next-line:member-access
    async list(page: number, limit: number): Promise<Conversation[]> {
        let dataBag: Array<Conversation> = [];
        let data: Array<Conversation> = [];
        let keys: Array<number> = await this.store.keys();
        keys.forEach(async (element: number, index: number) => {
            dataBag = await this.store.get(element);
            data[index] = {
                id : dataBag[index].id,
                userId: dataBag[index].userId,
                direction: dataBag[index].direction,
                message: dataBag[index].message,
                timestamp: dataBag[index].timestamp
            };

        });

        return data;
    }
    // tslint:disable-next-line:member-access
    async create(data: Conversation): Promise<Conversation> {
        // check if exist
        let check = await this.store.get(data.id);
        if (check || check !== undefined) throw new Error("Conversation is already Exist!");
        let created = {
            id : data.id,
            userId: data.userId,
            direction: data.direction,
            message: data.message,
            timestamp: data.timestamp
        };
        let conversation = await this.store.set(data.id, created);

        return conversation;
    }
    // tslint:disable-next-line:member-access
    /**
     *
     * @param id number primary key
     * @param partialData the output object
     */
    // tslint:disable-next-line:member-access
    async update(id: number, partialData: Conversation): Promise<Conversation> {
        let checkData = await this.store.get(id);
        // tslint:disable-next-line:ter-max-len
        if (!checkData || checkData == null || checkData === undefined) throw new Error("Conversation is not found");
        let updatedData = {
            id : partialData.id,
            userId: partialData.userId,
            direction: partialData.direction,
            message: partialData.message,
            timestamp: partialData.timestamp
        };
        let data: any = await this.store.set(id, updatedData);
        return updatedData;
    }

    /**
     *
     * @param id conversation primary key
     */
    // tslint:disable-next-line:member-access
    async remove(id: number): Promise<Conversation> {
        let data = await this.store.get(id);
        let deleted = await this.store.delete(id);
        if (deleted) return data;
        throw new Error("Data is already deleted.");
    }

}
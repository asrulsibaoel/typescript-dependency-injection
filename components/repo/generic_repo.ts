export default class GenericRepo {
    public id: number;
    private store: any;

    /**
     *
     * @param id object primary key
     */
    // tslint:disable-next-line:member-access
    async get(id: number): Promise<object> {
        let partialData = await this.store.get(id);
        delete partialData.store;
        return partialData;
    }
    // tslint:disable-next-line:member-access
    async list(page: number, limit: number): Promise<object[]> {
        let dataBag: Array<any> = [];
        let data: Array<any> = [];
        let keys: Array<string> = await this.store.keys();
        keys.forEach(async (element: string, index: number) => {
            dataBag = await this.store.get(element);
            data[index] = Object.assign(dataBag);
            delete data[index].store;
        });

        return data;
    }
    // tslint:disable-next-line:member-access
    async create(data: object): Promise<object> {
        // check if exist
        let check = await this.store.get(this.id);
        if (check || check !== undefined) throw new Error("object is already Exist!");
        let object = await this.store.set(this.id, data);
        return object;
    }
    // tslint:disable-next-line:member-access
    /**
     *
     * @param id number primary key
     * @param partialData the output object
     */
    // tslint:disable-next-line:member-access
    async update(id: number, partialData: any): Promise<object> {
        let checkData = await this.store.get(id);
        // tslint:disable-next-line:ter-max-len
        if (!checkData || checkData == null || checkData === undefined) throw new Error("object is not found");
        let updatedData = Object.assign(partialData);
        delete updatedData.store;
        let data: any = await this.store.set(id, updatedData);
        return data;
    }

    /**
     *
     * @param id object primary key
     */
    // tslint:disable-next-line:member-access
    async remove(id: number): Promise<object> {
        let data = await this.store.get(id);
        let deleted = await this.store.delete(id);
        if (deleted) return data;
        throw new Error("Data is already deleted.");
    }

}
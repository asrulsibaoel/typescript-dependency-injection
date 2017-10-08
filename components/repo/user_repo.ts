import User from "./user";

export default class UserRepo implements User {
    // tslint:disable-next-line:member-access
    id: number;
    // tslint:disable-next-line:member-access
    name: string;
    // tslint:disable-next-line:member-access
    gender: "male" | "female";
    // tslint:disable-next-line:member-access
    city: string;
    // tslint:disable-next-line:member-access
    phone: string;
    // tslint:disable-next-line:member-access
    email: string;

    // tslint:disable-next-line:member-access
    store: any;
    /**
     *
     * @param store database connection
     */
    constructor(store: any) {
        this.store = store;
    }

    /**
     *
     * @param id user primary key
     */
    // tslint:disable-next-line:member-access
    async get(id: number): Promise<User> {
        let user = await this.store.get(id);
        let data = {
            id : user.id,
            name: user.name,
            gender : user.gender,
            city: user.city,
            phone: user.phone,
            email: user.email
        };
        return data;
    }
    // tslint:disable-next-line:member-access
    async list(page: number, limit: number): Promise<User[]> {
        let dataBag: Array<User> = [];
        let data: Array<User> = [];
        let keys: Array<number> = await this.store.keys();
        keys.forEach(async (element: number, index: number) => {
            dataBag[index] = await this.store.get(element);
            data[index] = {
                id : dataBag[index].id,
                name: dataBag[index].name,
                gender : dataBag[index].gender,
                city: dataBag[index].city,
                phone: dataBag[index].phone,
                email: dataBag[index].email
            };
        });
        return data;
    }
    // tslint:disable-next-line:member-access
    async create(data: User): Promise<User> {
        // check if exist
        let check = await this.store.get(this.id);
        if (check || check !== undefined) throw new Error("User is already Exist!");
        let user = await this.store.set(this.id, data);
        let getUser = await this.store.get(this.id);
        return getUser;
    }
    // tslint:disable-next-line:member-access
    /**
     *
     * @param id number primary key
     * @param user the output object
     */
    // tslint:disable-next-line:member-access
    async update(id: number, partialData: User): Promise<User> {
        let checkData = await this.store.get(id);
        // tslint:disable-next-line:ter-max-len
        if (!checkData || checkData == null || checkData === undefined) throw new Error("User is not found");
        let updatedData = {
            id : partialData.id,
            name: partialData.name,
            gender : partialData.gender,
            city: partialData.city,
            phone: partialData.phone,
            email: partialData.email
        };
        let data: any = await this.store.set(id, updatedData);
        
        return updatedData;
    }

    /**
     *
     * @param id user primary key
     */
    // tslint:disable-next-line:member-access
    async remove(id: number): Promise<User> {
        let data = await this.store.get(id);
        let deleted = await this.store.delete(id);
        if (deleted) return data;
        throw new Error("Data is already deleted.");
    }
}
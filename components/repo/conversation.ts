export default interface Conversation {
    id: number;
    userId: string;
    direction: "incoming" | "outgoing";
    message: string;
    timestamp: number;
}
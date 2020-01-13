export default interface FindInterface {
    page: number;
    pageSize: number;
    search?: string;
    sortingColumn?: string;
    sortingDirection?: string;
}
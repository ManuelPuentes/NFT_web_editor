export interface PaginatedResponse<C> {
	readonly totalItems: number;
	readonly items: Array<C>;
	readonly nextItem?: number;
}

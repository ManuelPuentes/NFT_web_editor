
export class PaginatedResponseDTO<C> {
    readonly totalItems: number;
    readonly items: C[];
    readonly nextItem?: number;
}

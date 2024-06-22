import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { CollectionDrawOrderNotFoundException } from '../exceptions/collection-draw-order-not-found.exception';
import { InvalidDrawOrderException } from '../exceptions/invalid-draw-order.exception';

@Injectable()
export class SetDrawOrderService {
    constructor() { }

    async exec({ collection_name, draw_order }: {
        collection_name: string,
        draw_order: Array<string>
    }): Promise<void> {

        this.ensureDrawOrderFileExist({ collection_name });

        const old_draw_order: Array<string> = this.loadOldDrawOrder({ collection_name });

        this.validateNewDrawOrder({ new_draw_order: draw_order, old_draw_order });

        this.overwriteDrawOrderFile({ collection_name, new_draw_order: draw_order });
    }

    private ensureDrawOrderFileExist({ collection_name }: { collection_name: string }) {
        const path = `./collections/${collection_name}/draw_order.json`;

        if (!fs.existsSync(path)) {
            throw new CollectionDrawOrderNotFoundException();
        }
    }

    private loadOldDrawOrder({ collection_name }: { collection_name: string }) {
        const path = `./collections/${collection_name}/draw_order.json`;
        return JSON.parse(fs.readFileSync(path).toString());
    }


    private validateNewDrawOrder({ new_draw_order, old_draw_order }: {
        new_draw_order: Array<string>,
        old_draw_order: Array<string>
    }) {

        const checker = (arr: Array<string>, target: Array<string>) => target.every(
            v => arr.includes(v)
        );

        if (!checker(new_draw_order, old_draw_order)) {
            throw new InvalidDrawOrderException();
        }
    }

    private overwriteDrawOrderFile({ collection_name, new_draw_order }: {
        collection_name: string,
        new_draw_order: Array<string>,
    }) {
        const path = `./collections/${collection_name}/draw_order.json`;
        fs.writeFileSync(path, JSON.stringify(new_draw_order));
    }

}

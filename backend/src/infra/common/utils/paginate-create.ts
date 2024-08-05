import { BadRequestException } from "@nestjs/common";
import { FilterLimit } from "src/helpers/interfaces/filter-options";
import { IPaginator } from "src/helpers/interfaces/paginator-response-interface";
import { ISelectQueryBuilder } from "src/helpers/interfaces/select-query-builder-interface";

export const PaginateCreate = async <T = any>(
    queryBuilder: ISelectQueryBuilder<T>,
    pageFilter: number,
    limitFilter: FilterLimit,
): Promise<IPaginator<T>> => {
    try {
        if (limitFilter == 'all') {
            limitFilter = 0;
        }

        let [items, totalItems] = await queryBuilder
            .take(limitFilter)
            .skip((pageFilter - 1) * limitFilter)
            .getManyAndCount()
            .catch((error) => {
                console.error(error);
                throw new BadRequestException(error);
            });
        const page: IPaginator = {
            items: items,
            meta: {
                totalItems: +totalItems,
                currentPage: +pageFilter,
                itemsPerPage: limitFilter == 0 ? totalItems : +limitFilter,
                itemCount: items.length,
                totalPage:
                    limitFilter == 0
                        ? 1
                        : Number.isInteger(totalItems / limitFilter)
                        ? totalItems / limitFilter
                        : Math.trunc(totalItems / limitFilter) + 1,
            },
        };
        return page;
    } catch (error) {
        console.error(error);
        throw new BadRequestException(error);
    }
};

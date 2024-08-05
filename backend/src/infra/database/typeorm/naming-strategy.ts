import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';

export class SnakeNamingStrategy
    extends DefaultNamingStrategy
    implements NamingStrategyInterface {

    joinColumnName(relationName: string, referencedColumnName: string): string {
        return snakeCase(relationName + '_' + referencedColumnName.replace(relationName + '_', ''));
    }

    joinTableColumnName(
        propertyName: string,
        columnName?: string,
    ): string {
        return snakeCase(
            (columnName ? columnName : propertyName),
        );
    }

}

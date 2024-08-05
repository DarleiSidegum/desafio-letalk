export type IFilterOptions<T, B = {}> = {
        [P in keyof T]?: T[P];
    } &
    {
        [P in keyof T as T[P] extends object ? never : `${Extract<P, string>}_array`]?:
            | T[P][]
            | string[]
            | string;
    } &
    {
        [P in keyof T as T[P] extends Date ? `${Extract<P, string>}_date_end` : never]?:
            | T[P]
            | string;
    } &
    {
        [P in keyof T as T[P] extends Date ? `${Extract<P, string>}_date_start` : never]?:
            | T[P]
            | string;
    } &
    {
        [P in keyof B]?: B[P];
    } & {
        direction?: string | Direction;
        sort?: string;
        page?: number;
        limit?: FilterLimit;
        text?: string;
    };

export type ApplyFilter<T, B = {}> = T extends object
    ? IFilterOptions<T, B> & {
          [P in keyof T]: ApplyFilter<T[P]>;
      }
    : IFilterOptions<T, B>;

export type FilterLimit = number | 'all';
export type Direction = 'ASC' | 'DESC';

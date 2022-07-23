import {Filter} from 'enums/Filter';

export const filterMap = new Map()
    .set(
        Filter.all,
        list => list,
    )
    .set(
        Filter.active,
        list => list.filter(({completed}) => !completed),
    )
    .set(
        Filter.completed,
        list => list.filter(({completed}) => completed),
    );

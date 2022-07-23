import Enum from 'enum';

export const Filter = new Enum(
    {
        all: 1,
        active: 2,
        completed: 3,
    },
    {freeze: true}
);

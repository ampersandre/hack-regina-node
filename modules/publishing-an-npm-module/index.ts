import _ from 'lodash';

export function makeStringArray(n: number, str: string) {
    return _.times(n, _.constant(str));
}
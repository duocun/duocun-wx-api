import {config} from '../config';

test('database port', () => {
    expect(config.DB_PORT).toBe('27017');
});
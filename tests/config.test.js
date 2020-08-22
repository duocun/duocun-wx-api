import {cfg} from '../config';

test('database port', () => {
    expect(cfg.DB_PORT).toBe('27017');
});

test('svc port', () => {
    expect(cfg.SVC_PORT).toBe('8004');
});
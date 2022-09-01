import { getLogger, streamToArray } from '@vulcan-sql/core';
import { DuckDBDataSource } from '../src';
import * as fs from 'fs';
import * as duckdb from 'duckdb';
import * as path from 'path';
import { ILogObject } from 'tslog';

const testFile = path.resolve(__dirname, 'test.db');

const runQuery = (db: duckdb.Database, sql: string) =>
  new Promise<void>((resolve, reject) => {
    db.run(sql, (err: any) => {
      if (err) reject(err);
      else resolve();
    });
  });

beforeAll(async () => {
  if (fs.existsSync(testFile)) fs.unlinkSync(testFile);
  const db = new duckdb.Database(testFile);
  await runQuery(
    db,
    `create table users (id INTEGER, name VARCHAR, age INTEGER, enabled BOOLEAN);`
  );
  await runQuery(db, `insert into users values(1, 'freda', 18, true);`);
  await runQuery(db, `insert into users values(2, 'william', 180, true);`);
  await runQuery(db, `insert into users values(3, 'ivan', 1800, true);`);
  // some users for testing chunk data (chunk size 1024)
  for (let i = 0; i < 2000; i++) {
    await runQuery(
      db,
      `insert into users values(${i + 4}, 'user${i}', 18000, false);`
    );
  }
});

afterAll(async () => {
  if (fs.existsSync(testFile)) fs.unlinkSync(testFile);
});

it('Should work with memory-only database', async () => {
  // Arrange
  const dataSource = new DuckDBDataSource(null as any, 'duckdb'); // set config to null, test the tolerance
  const bindParams = new Map<string, any>();
  bindParams.set(
    await dataSource.prepare({ parameterIndex: 1, value: 123 }),
    123
  );
  bindParams.set(
    await dataSource.prepare({ parameterIndex: 2, value: 456 }),
    456
  );
  // Act
  const { getColumns, getData } = await dataSource.execute({
    statement: 'select $1::INTEGER + $2::INTEGER as test',
    bindParams,
    operations: {} as any,
  });
  const columns = getColumns();
  const data = await streamToArray(getData());
  // Assert
  expect(columns).toEqual([{ name: 'test', type: 'number' }]);
  expect(data).toEqual([{ test: 579 }]);
});

it('Should work with persistent database', async () => {
  // Arrange
  const dataSource = new DuckDBDataSource(
    {
      'persistent-path': testFile,
    },
    'duckdb'
  );
  const bindParams = new Map<string, any>();
  bindParams.set('$1', 200);
  // Act
  const { getColumns, getData } = await dataSource.execute({
    statement: 'select * from "users" where age < $1 order by id desc',
    bindParams,
    operations: {} as any,
  });
  const columns = getColumns();
  const data = await streamToArray(getData());
  // Assert
  expect(columns.length).toBe(4);
  expect(columns).toContainEqual({ name: 'id', type: 'number' });
  expect(columns).toContainEqual({ name: 'name', type: 'string' });
  expect(columns).toContainEqual({ name: 'age', type: 'number' });
  expect(columns).toContainEqual({ name: 'enabled', type: 'boolean' });
  expect(data.length).toBe(2);
  expect(data[0]).toEqual({
    id: 2,
    name: 'william',
    age: 180,
    enabled: true,
  });
  expect(data[1]).toEqual({ id: 1, name: 'freda', age: 18, enabled: true });
});

it('Should send correct data with chunks', async () => {
  // Arrange
  const dataSource = new DuckDBDataSource(
    {
      'persistent-path': testFile,
    },
    'duckdb'
  );
  const bindParams = new Map<string, any>();
  // Act
  const { getData } = await dataSource.execute({
    statement: 'select * from "users" where age order by id',
    bindParams,
    operations: {} as any,
  });
  const data = await streamToArray(getData());
  // Assert
  expect(data.length).toBe(2000 + 3);
  expect(data[0]).toEqual({
    id: 1,
    name: 'freda',
    age: 18,
    enabled: true,
  });
  expect(data[1234]).toEqual({
    id: 1235,
    name: 'user1231',
    age: 18000,
    enabled: false,
  });
});

it('Should throw error from upstream', async () => {
  // Arrange
  const dataSource = new DuckDBDataSource({}, 'duckdb');
  const bindParams = new Map<string, any>();
  // Act, Assert
  await expect(
    dataSource.execute({
      statement: 'wrong syntax',
      bindParams,
      operations: {} as any,
    })
  ).rejects.toThrow(/^Parser Error: syntax error at or near "wrong"/);
});

it('Should return empty data and column with zero result', async () => {
  // Arrange
  const dataSource = new DuckDBDataSource(
    {
      'persistent-path': testFile,
    },
    'duckdb'
  );
  const bindParams = new Map<string, any>();
  bindParams.set('$1', 0);
  // Act
  const { getColumns, getData } = await dataSource.execute({
    statement: 'select * from "users" where age < $1',
    bindParams,
    operations: {} as any,
  });
  const columns = getColumns();
  const data = await streamToArray(getData());
  // Assert
  expect(columns.length).toBe(0);
  expect(data.length).toBe(0);
});

it('Should print queries without binding when log-queries = true', async () => {
  // Arrange
  const dataSource = new DuckDBDataSource(
    {
      'log-queries': true,
    },
    'duckdb'
  );
  const bindParams = new Map<string, any>();
  bindParams.set('$1', 1234);
  const logs: any[][] = [];
  const logger = getLogger({ scopeName: 'CORE' });
  const transport = (logObject: ILogObject) => {
    logs.push(logObject.argumentsArray);
  };
  logger.attachTransport({
    silly: transport,
    debug: transport,
    trace: transport,
    info: transport,
    warn: transport,
    error: transport,
    fatal: transport,
  });
  // Act
  await dataSource.execute({
    statement: 'select $1::INTEGER as test',
    bindParams,
    operations: {} as any,
  });
  // Assert
  expect(logs[0].length).toBe(1);
  expect(logs[0][0]).toBe(`select $1::INTEGER as test`);
});

it('Should print queries with binding when log-queries = true and log-parameters = true', async () => {
  // Arrange
  const dataSource = new DuckDBDataSource(
    {
      'log-queries': true,
      'log-parameters': true,
    },
    'duckdb'
  );
  const bindParams = new Map<string, any>();
  bindParams.set('$1', 1234);
  const logs: any[][] = [];
  const logger = getLogger({ scopeName: 'CORE' });
  const transport = (logObject: ILogObject) => {
    logs.push(logObject.argumentsArray);
  };
  logger.attachTransport({
    silly: transport,
    debug: transport,
    trace: transport,
    info: transport,
    warn: transport,
    error: transport,
    fatal: transport,
  });
  // Act
  await dataSource.execute({
    statement: 'select $1::INTEGER as test',
    bindParams,
    operations: {} as any,
  });
  // Assert
  expect(logs[0].length).toBe(2);
  expect(logs[0][0]).toBe(`select $1::INTEGER as test`);
  expect(logs[0][1]).toEqual([1234]);
});

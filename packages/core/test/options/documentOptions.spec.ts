import {
  DocumentServerType,
  DocumentSpec,
  IDocumentOptions,
  TYPES,
} from '../../src';
import { Container } from 'inversify';
import { DocumentOptions } from '../../src/options';

let container: Container;

beforeEach(() => {
  container = new Container();
  container.bind(TYPES.DocumentOptions).to(DocumentOptions).inSingletonScope();
});

it('Should provide correct default option values', async () => {
  // Action
  const options = container.get<DocumentOptions>(TYPES.DocumentOptions);
  // Assert
  expect(options.folderPath).toBe('.');
  expect(options.specs).toEqual([DocumentSpec.oas3]);
  expect(options.server).toEqual([DocumentServerType.redoc]);
});

it('Can override some option properties', async () => {
  // Arrange
  container
    .bind<Partial<IDocumentOptions>>(TYPES.DocumentInputOptions)
    .toConstantValue({
      folderPath: './some/folder',
    });
  const options = container.get<DocumentOptions>(TYPES.DocumentOptions);
  // Assert
  expect(options.folderPath).toBe('./some/folder');
  expect(options.specs).toEqual([DocumentSpec.oas3]);
  expect(options.server).toEqual([DocumentServerType.redoc]);
});

it('Schema validation should work', async () => {
  // Arrange
  container.bind(TYPES.DocumentInputOptions).toConstantValue({
    folderPath: true,
  });
  // Act. Assert
  expect(() => container.get<DocumentOptions>(TYPES.DocumentOptions)).toThrow();
});

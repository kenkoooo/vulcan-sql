import { ISchemaParserOptions, SchemaReaderType } from '@vulcan/build/models';
import {
  FileSchemaReader,
  SchemaParser,
  SchemaReader,
} from '@vulcan/build/schema-parser';
import { ContainerModule, interfaces } from 'inversify';
import { SchemaParserOptions } from '../../options/schemaParser';
import { TYPES } from '../types';

export const schemaParserModule = (options: ISchemaParserOptions) =>
  new ContainerModule((bind) => {
    // Options
    bind<ISchemaParserOptions>(TYPES.SchemaParserInputOptions).toConstantValue(
      options
    );
    bind<SchemaParserOptions>(TYPES.SchemaParserOptions)
      .to(SchemaParserOptions)
      .inSingletonScope();

    // Schema reader
    bind<SchemaReader>(TYPES.SchemaReader)
      .to(FileSchemaReader)
      .inSingletonScope()
      .whenTargetNamed(SchemaReaderType.LocalFile);

    bind<interfaces.AutoNamedFactory<SchemaReader>>(
      TYPES.Factory_SchemaReader
    ).toAutoNamedFactory<SchemaReader>(TYPES.SchemaReader);

    // Schema parser
    bind<SchemaParser>(TYPES.SchemaParser).to(SchemaParser).inSingletonScope();
  });

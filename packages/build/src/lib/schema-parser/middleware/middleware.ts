import { APISchema, RequestParameter, ValidatorDefinition } from '@vulcan/core';
import { DeepPartial } from 'ts-essentials';

export interface RawRequestParameter
  extends Omit<RequestParameter, 'validators'> {
  validators: Array<ValidatorDefinition | string>;
}

export interface RawAPISchema extends DeepPartial<Omit<APISchema, 'request'>> {
  /** Indicate the identifier of this schema from the source, it might be uuid, file path, url ...etc, depend on the provider */
  sourceName: string;
  request?: DeepPartial<RawRequestParameter[]>;
}

export interface SchemaParserMiddleware {
  (schema: RawAPISchema, next: () => Promise<void>): Promise<void>;
}
import { AllTemplateMetadata, APISchema } from '@vulcan/core';
import { SchemaParserMiddleware } from './middleware';

// Add error code to definition if it is used in query but not defined in schema
export const addMissingErrors =
  (allMetadata: AllTemplateMetadata): SchemaParserMiddleware =>
  async (schemas, next) => {
    await next();
    const transformedSchemas = schemas as APISchema;
    const templateName = transformedSchemas.templateSource;
    const metadata = allMetadata[templateName];
    // Skip validation if no metadata found
    if (!metadata?.errors) return;

    metadata.errors.forEach((error) => {
      if (!transformedSchemas.errors.some((e) => e.code === error.code)) {
        transformedSchemas.errors.push({
          code: error.code,
          message: '',
        });
      }
    });
  };

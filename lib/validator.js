/*
  Validate an individual object conforms to the relevant content schema
  @param {Content} content
  @throws {ValidationError}
*/
export function validateContentItem(content) {
  if (!content) throw new Error('Cannot validate falsey');
  if (!content.id) {
    throw new Error('Content must have an id');
  }
  // TODO: validate against a schema
}

/**
 * Validate the contents of a Builder.
 * Throws a single error if any of the items are invalid.
 * This error wraps the individual Validation errors.
 * @param {Builder} builder
 */
export function validateBuilder(builder) {
  const validationErrors = [];

  for (const content of builder.content.values()) {
    try {
      validateContentItem(content);
    } catch (validationError) {
      validationErrors.push(validationError);
    }
  }

  if (validationErrors.length) {
    const errorWrapper =  new Error();
    errorWrapper.wrappedErrors = validationErrors;
    throw errorWrapper;
  }

  return true;
}

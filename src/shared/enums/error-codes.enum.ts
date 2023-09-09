export enum ErrorCodes {
  InvalidForm = 'errors.invalid-form',

  FieldShouldBeString = 'errors.field-invalid.should-be-string',
  FieldShouldBeNumber = 'errors.field-invalid.should-be-number',
  FieldShouldBeEnum = 'errors.field-invalid.should-be-enum',
  FieldShouldBeEmail = 'errors.field-invalid.should-be-email',

  NotAuthorizedRequest = 'errors.not-authorized.request',

  InvalidStatus_UserInactive = 'errors.invalid-status.user-inactive',

  NotExists_User = 'errors.not-exists.user',
  Wrong_Password = 'error.password',
  Wrong_Id = 'errors.invalid-id.product-find-one',

  CartItemExists = 'error.product-already-added-to-the-cart',
}

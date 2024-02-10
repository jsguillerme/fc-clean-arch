import ValidatorInterface from "../../@shared/validator/validator.interface";
import Customer from "../entity/customer";
import * as yup from "yup";

export default class CustomerYupValidator implements ValidatorInterface<Customer> {
  validate(entity: Customer): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required('ID cannot be empty'),
          name: yup.string().required('Name cannot be empty'),
        })
        .validateSync(
          {
            id: entity.id,
            name: entity.name
          }, 
          {
            abortEarly: false
          }
        )
    } catch (errors) {
      const error = errors as yup.ValidationError;

      error.errors.forEach((error) => {
        entity.notification.addError({
          context: 'Customer',
          message: error,
        })
      })
    }
  }
}
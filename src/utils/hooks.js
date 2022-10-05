import { useCallback, useState } from "react";
// import { useCallback } from "./react";

//хук управления формой
// export function useForm() {
//   const [values, setValues] = React.useState({});

//   const handleChange = (event) => {
//     const target = event.target;
//     const value = target.value;
//     const name = target.name;
//     setValues({...values, [name]: value});
//   };

//   return {values, handleChange, setValues};
// }

//хук управления формой и валидации формы
export default function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isVisibleSpanError, setVisibleSpanError] = useState("");

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setVisibleSpanError(event.target);

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
    console.log(errors);
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false ) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
      setVisibleSpanError("");
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm, isVisibleSpanError};
}

// routesSign.post('/signup', celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().required().email(),
//     password: Joi.string().required(),
//     name: Joi.string().min(2).max(30).required(),
//   }),
// }), createUser);

// routesSign.post('/signin', celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().required().email(),
//     password: Joi.string().required(),
//   }),
// }), login);

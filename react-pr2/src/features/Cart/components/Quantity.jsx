import React from 'react';
import InputQuantityField from '../../../components/form-controls/InputQuantityField';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { setQuantity } from '../../../store/Slice/cartSlice';

function Quantity({ id, quantity }) {
  const dispatch = useDispatch();
  const schema = yup
    .object()
    .shape({
      quantity: yup
        .number()
        .required('Please enter quantity')
        .min(1, 'Minimum value is 1')
        .typeError('Please enter a number'),
    })
    .required();

  const form = useForm({
    defaultValues: {
      quantity: quantity,
      id: id,
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    dispatch(setQuantity(values));
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputQuantityField name="quantity" id={id} />
      </form>
    </FormProvider>
  );
}

export default Quantity;

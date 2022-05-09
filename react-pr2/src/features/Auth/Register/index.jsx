import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { auth } from '../../../firebase';
import { register } from '../../../store/Slice/userSlice';
import RegisterForm from '../RegisterForm';

function Register(props) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const history = useHistory();

  const handleSubmit = async (values) => {
    try {
      const { fullName, email, password, phone } = values;
      const userFirebase = await createUserWithEmailAndPassword(auth, email, password);
      const user = userFirebase.user;
      const newUser = { id: user.uid, fullName, email, phone, password, role: 2 };

      dispatch(register(newUser));
      history.push('/');

      const { closeDialog } = props;
      if (closeDialog) {
        closeDialog();
      }
      enqueueSnackbar(`${t('Register successfully')}`, { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };
  return (
    <div>
      <RegisterForm onSubmit={handleSubmit}></RegisterForm>
    </div>
  );
}

export default Register;

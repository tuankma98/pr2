import { signInWithEmailAndPassword } from 'firebase/auth';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ADMIN_ROLE } from '../../../constants';
import { auth } from '../../../firebase';
import { getUserLogin, login } from '../../../store/Slice/userSlice';
import LoginForm from '../LoginForm';
import { useTranslation } from 'react-i18next';

function Login(props) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();

  const handleSubmit = async (values) => {
    try {
      const { email, password } = values;
      const userFirebase = await signInWithEmailAndPassword(auth, email, password);

      const user = userFirebase.user;
      await dispatch(login(user.uid));
      const { role, id } = JSON.parse(localStorage.getItem('user'));
      dispatch(getUserLogin(id));
      const link = role === ADMIN_ROLE ? '/admin' : -1;
      history.push(link);

      const { closeDialog } = props;
      if (closeDialog) {
        closeDialog();
      }

      enqueueSnackbar(`${t('Login successfully')}`, { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Login;

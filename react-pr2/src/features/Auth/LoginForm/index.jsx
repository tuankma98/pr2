import { yupResolver } from '@hookform/resolvers/yup';
import { LockOutlined } from '@mui/icons-material';
import { Avatar, Button, LinearProgress, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import InputField from '../../../components/form-controls/InputField';
import PasswordField from '../../../components/form-controls/PasswordField';
import { regex_email } from '../../../constants/';
import { slowLoading } from '../../../utils/utils';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '32px',
  },
  title: {
    textAlign: 'center',
    margin: '16px 0 24px 0',
  },
  submit: {
    margin: '16px 0 24px',
  },
  progress: {
    position: 'absolute',
    top: '-20px',
    left: 0,
    right: 0,
  },
}));

function LoginForm(props) {
  const classes = useStyles();
  const { t } = useTranslation();

  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Please enter your email.')
      .matches(regex_email, 'Please enter a valid email, without special characters and ending in @xyz.com'),
    password: yup.string().required('Please enter your password.'),
  });
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    reValidateMode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    await slowLoading();
    const { onSubmit } = props;
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress} />}
      <Avatar sx={{ backgroundColor: `${red[600]}`, margin: '0 auto' }}>
        <LockOutlined />
      </Avatar>

      <Typography className={classes.title} component="h3" variant="h5">
        {t('Sign In')}
      </Typography>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="email" label="Email" form={form} />
        <PasswordField name="password" label={t('Password')} form={form} />

        <Button
          disabled={isSubmitting}
          type="submit"
          className={classes.submit}
          variant="contained"
          color="primary"
          fullWidth
          size="large"
        >
          {t('Sign In')}
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;

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
import { regex_email, regex_password, regex_phone } from '../../../constants';
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
    margin: '16px 0 32px',
  },
  progress: {
    position: 'absolute',
    top: '-20px',
    left: 0,
    right: 0,
  },
}));

function RegisterForm(props) {
  const classes = useStyles();
  const { t } = useTranslation();

  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('Please enter your full name.')
      .test('Should has at least two words.', 'Please enter at least two words.', (value) => {
        return value.split(' ').length >= 2;
      }),
    email: yup
      .string()
      .required('Please enter your email.')
      .matches(regex_email, 'Please enter a valid email, without special characters and ending in @xyz.com'),
    phone: yup.string().required('Please enter your phone.').matches(regex_phone, 'Must be a valid phone number'),
    password: yup
      .string()
      .required('Please enter your password.')
      .matches(
        regex_password,
        'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character!'
      ),
    retypePassword: yup
      .string()
      .required('Please retype your password.')
      .oneOf([yup.ref('password')], 'Password does not match.'),
  });
  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      retypePassword: '',
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
      <Avatar sx={{ backgroundColor: `${red[500]}`, margin: '0 auto' }}>
        <LockOutlined />
      </Avatar>

      <Typography className={classes.title} component="h3" variant="h5">
        {t('Create An Account')}
      </Typography>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="fullName" label={t('Fullname')} form={form} />
        <InputField name="email" label="Email" form={form} />
        <InputField name="phone" label={t('Number Phone')} form={form} />
        <PasswordField name="password" label={t('Password')} form={form} />
        <PasswordField name="retypePassword" label={t('Retype Password')} form={form} />

        <Button
          disabled={isSubmitting}
          type="submit"
          className={classes.submit}
          variant="contained"
          color="primary"
          fullWidth
          size="large"
        >
          {t('Create An Account')}
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;

import { Button, Stack, Typography } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import { FormProvider, FTextField } from '../components/form'
import { useAuth } from '../contexts/AuthContext'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required')
})
const defaultValues = {
  username: 'UserName',
  password: '12345'
}

function LoginPage () {
  const navigate = useNavigate()
  const location = useLocation()
  const auth = useAuth()
  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues
  })
  const { handleSubmit } = methods
  const onSubmit = async (data) => {
    const from = location.state?.from?.pathname || '/'
    const username = data.username
    auth.login(username, () => {
      navigate(from, { replace: true })
    })
  }
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ minWidth: '350px' }}>
        <Typography variant='h4' textAlign='center'>
          Login
        </Typography>
        <FTextField name='username' label='Username' />
        <FTextField name='password' label='Password' type='password' />
        <Button type='submit' variant='contained'>
          Login
        </Button>
      </Stack>
    </FormProvider>
  )
}
export default LoginPage

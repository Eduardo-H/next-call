import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'

import { Container, Form, FormError, Header } from './styles'
import { api } from '@/lib/axios'
import { AxiosError } from 'axios'

const registerUserFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name needs to have at least 2 characters' }),
  username: z
    .string()
    .min(2, { message: 'Username needs to have at least 2 characters' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'Username can only have letters and hyphens',
    })
    .transform((username) => username.toLocaleLowerCase()),
})

type RegisterUserFormData = z.infer<typeof registerUserFormSchema>

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterUserFormData>({
    resolver: zodResolver(registerUserFormSchema),
  })

  const router = useRouter()

  async function handleRegisterUser(data: RegisterUserFormData) {
    try {
      await api.post('/users', {
        name: data.name,
        username: data.username,
      })
    } catch (error) {
      if (error instanceof AxiosError && error?.response?.data?.message) {
        alert(error?.response?.data?.message)
      } else {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    if (router.query?.username) {
      setValue('username', String(router.query.username))
    }
  }, [router.query?.username, setValue])

  return (
    <Container>
      <Header>
        <Heading as="strong">Welcome to Next Call!</Heading>
        <Text>
          We need some informations to create your profile! You can edit these
          anytime you want.
        </Text>

        <MultiStep size={4} currentStep={1} />
      </Header>

      <Form as="form" onSubmit={handleSubmit(handleRegisterUser)}>
        <label>
          <Text>Username</Text>
          <TextInput
            prefix="next.call/"
            placeholder="your-username"
            {...register('username')}
          />

          {errors.username && (
            <FormError size="sm">{errors.username.message}</FormError>
          )}
        </label>

        <label>
          <Text>Full name</Text>
          <TextInput placeholder="Your full name" {...register('name')} />

          {errors.name && (
            <FormError size="sm">{errors.name.message}</FormError>
          )}
        </label>

        <Button type="submit" disabled={isSubmitting}>
          Next step <ArrowRight />
        </Button>
      </Form>
    </Container>
  )
}

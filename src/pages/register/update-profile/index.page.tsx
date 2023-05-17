import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Avatar,
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea,
} from '@xunito-ui/react'

import { buildNextAuthOptions } from '../../api/auth/[...nextauth].api'

import { Container, Header } from '../styles'
import { ProfileBox, FormAnnotation } from './styles'
import { api } from '@/lib/axios'
import { useRouter } from 'next/router'

const updateProfileFormSchema = z.object({
  bio: z.string(),
})

type UpdateProfileFormData = z.infer<typeof updateProfileFormSchema>

export default function UpdateProfile() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileFormSchema),
  })

  const session = useSession()
  const router = useRouter()

  async function handleUpdateProfile(data: UpdateProfileFormData) {
    await api.put('/users/profile', {
      bio: data.bio,
    })

    await router.push(`/schedule/${session.data?.user.username}`)
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Welcome to Next Call!</Heading>
        <Text>
          We need some informations to create your profile! You can edit these
          anytime you want.
        </Text>

        <MultiStep size={4} currentStep={4} />
      </Header>

      <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
        <label>
          <Text>Profile picture</Text>
          <Avatar
            src={session.data?.user.avatar_url}
            alt={session.data?.user.name}
          />
        </label>

        <label>
          <Text>Biography</Text>
          <TextArea placeholder="Tell us about yourself" {...register('bio')} />
          <FormAnnotation size="sm">
            Write a bit about yourself. This will be shown in your personal
            profile.
          </FormAnnotation>
        </label>

        <Button type="submit" disabled={isSubmitting}>
          Finish
        </Button>
      </ProfileBox>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  return {
    props: {
      session,
    },
  }
}

import Image from 'next/image'
import { Heading, Text } from '@ignite-ui/react'

import { Container, Hero, Preview } from './styles'

import previewImage from '../../assets/app-preview.png'
import { ClaimUsernameForm } from './components/ClaimUsernameForm'

export default function Home() {
  return (
    <Container>
      <Hero>
        <Heading size="4xl">Mettings made easy</Heading>
        <Text size="xl">
          Connect your calendar and allow others to set appointments in your
          free time.
        </Text>

        <ClaimUsernameForm />
      </Hero>

      <Preview>
        <Image
          src={previewImage}
          height={400}
          quality={100}
          priority
          alt="A calendar previewing the application's functionality"
        />
      </Preview>
    </Container>
  )
}

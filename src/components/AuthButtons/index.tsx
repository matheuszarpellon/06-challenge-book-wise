import Image from "next/image"
import { AuthButton, Container } from "./styles"
import { signIn } from "next-auth/react"
import { useRouter } from "next/router"

type AuthButtonProps = {
  canGuest?: boolean
  callbackUrl?: string
}
export const AuthButtons = ({ canGuest, callbackUrl = "/" }: AuthButtonProps) => {
  const router = useRouter()

  const handleSignIn = (provider?: string) => {
    if (!provider) {
      router.push(callbackUrl)
      return
    }

    signIn(provider, {
      callbackUrl
    })
  }

  return (
    <Container>
      <AuthButton onClick={() => handleSignIn("google")}>
        <Image src="/images/icons/google.svg" width={24} height={24} alt="Logo da Google" />
        Entrar com Google
      </AuthButton>
      <AuthButton onClick={() => handleSignIn("github")}>
        <Image src="/images/icons/github.svg" width={24} height={24} alt="Logo do Github" />
        Entrar com Github
      </AuthButton>
      {canGuest &&
        <AuthButton onClick={() => handleSignIn()}>
          <Image src="/images/icons/rocket.svg" width={24} height={24} alt="Logo de um foguete" />
          Entrar como visitante
        </AuthButton>
      }
    </Container>
  )
}
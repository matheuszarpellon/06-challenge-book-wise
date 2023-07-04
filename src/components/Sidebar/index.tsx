import Image from "next/image"
import { Container, LoginButton, UserDetails } from "./styles"
import { Navigation } from "../Navigation"
import { signOut, useSession } from "next-auth/react"
import { SignIn, SignOut } from "@phosphor-icons/react"
import { Text } from "../Typography"
import { Avatar } from "../Avatar"
import { useRouter } from "next/router"

export const Sidebar = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const user = session?.user;

  const handleOpenProfile = () => {
    router.push(`/profile/${user?.id}`)
  }

  return (
    <Container>
      <div>
        <img src="/images/logo.svg" alt="BookWise Logo" className="logo" />
        <Navigation />
      </div>

      <footer>
        {!user ? (
          <LoginButton href="/login">
            Fazer login
            <SignIn size={24} />
          </LoginButton>
        ) : (
          <UserDetails>
            <Avatar size="sm" src={user?.avatar_url} alt={user?.name} onClick={handleOpenProfile} css={{ cursor: "pointer" }} />
            <Text size="sm">{user?.name}</Text>
            <SignOut color="#F75A68" size={20} onClick={() => signOut()} />
          </UserDetails>
        )}
      </footer>
    </Container>
  )
}
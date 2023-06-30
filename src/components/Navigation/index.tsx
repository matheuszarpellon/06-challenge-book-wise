import { Binoculars, ChartLineUp, User } from "@phosphor-icons/react"
import { Container, NavItemContainer } from "./styles"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { useMemo } from "react"

const NAV_ITEMS = [
  { 
    label: "Início",
    href: "/",
    icon: <ChartLineUp size={24} />
  },
  { 
    label: "Explorar",
    href: "/explore",
    icon: <Binoculars size={24} />
  }
]
export const Navigation = () => {
  const router = useRouter()
  const { data: session } = useSession()

  const navItems = useMemo(() => {
    if(session) {
      return NAV_ITEMS.concat({
        label: "Perfil",
        href: `/profile/${session.user.id}`,
        icon: <User size={24} />
      })
    }

    return NAV_ITEMS
  }, [session])

  return (
    <Container>
      {navItems.map((item) => (
        <NavItemContainer href={item.href} key={item.label} active={router.asPath === item.href}>
          {item.icon}
          {item.label}
        </NavItemContainer>
      ))}
    </Container>
  )
}
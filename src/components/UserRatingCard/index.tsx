import { Rating, User } from "@prisma/client"
import { Container, UserDetails } from "./styles"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { Avatar } from "../Avatar"
import { Heading, Text } from "../Typography"
import { getRelativeTimeString } from "@/utils/getRelativeTimeString"
import { RatingStars } from "../RatingStars"

export type RatingWithAuthor = Rating & {
  user: User
}
type UserRatingCardProps = {
  rating: RatingWithAuthor
}

export const UserRatingCard = ({ rating }: UserRatingCardProps) => {
  const { data: session } = useSession()
  const distance = getRelativeTimeString(new Date(rating.created_at), "pt-BR")

  const isOwner = session?.user?.id === rating.user_id
  return (
    <Container variant={isOwner ? "highlight" : "primary"}>
      <UserDetails>
        <section>
          <Link href={`/profile/${rating.user_id}`}>
            <Avatar src={rating.user.avatar_url!} alt={rating.user.name} />
          </Link>
          <div>
            <Heading size="xs">{rating.user.name}</Heading>
            <Text size="sm">{distance}</Text>
          </div>
        </section>

        <RatingStars rating={rating.rate} />
      </UserDetails>

      <Text size="sm" color="gray-300">{rating.description}</Text>
    </Container>
  )
}
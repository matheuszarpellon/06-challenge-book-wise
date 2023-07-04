import { Text } from "../Typography"
import { Link } from "../Link"
import { Container } from "./styles"
import { RatingWithAuthor, UserRatingCard } from "../UserRatingCard"
import { Fragment, useState } from "react"
import { RatingForm } from "../RatingForm"
import { useSession } from "next-auth/react"
import { LoginDialog } from "../LoginDialog"

type BookRatingsProps = {
  ratings: RatingWithAuthor[]
  bookId: string
}

export const BookRatings = ({ bookId, ratings }: BookRatingsProps) => {
  const [showForm, setShowForm] = useState(false)
  const { status, data: session } = useSession()

  const isAuthenticated = status === 'authenticated'

  const handleRate = () => {
    if (!isAuthenticated) return
    setShowForm(true)
  }

  const RatingWrapper = isAuthenticated ? Fragment : LoginDialog

  const sortedRatingsByDate = ratings.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  })

  const canRate = ratings.every(rating => rating.user_id !== session?.user?.id)

  return (
    <Container>
      <header>
        <Text>Avaliações</Text>
        {canRate && (
          <RatingWrapper>
            <Link withoutIcon onClick={handleRate} text="Avaliar" />
          </RatingWrapper>
        )}
      </header>

      <section>
        {showForm && <RatingForm bookId={bookId} onCancel={() => setShowForm(false)} />}
        {sortedRatingsByDate.map(rating => (
          <UserRatingCard key={rating.id} rating={rating} />
        ))}
      </section>
    </Container>
  )
}

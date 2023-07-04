import { Text } from "../Typography"
import { Link } from "../Link"
import { Container } from "./styles"
import { RatingWithAuthor, UserRatingCard } from "../UserRatingCard"
import { useState } from "react"
import { RatingForm } from "../RatingForm"
import { useSession } from "next-auth/react"

type BookRatingsProps = {
  ratings: RatingWithAuthor[]
  bookId: string
}

export const BookRatings = ({bookId, ratings}: BookRatingsProps) => {
  const [showForm, setShowForm] = useState(false)
  const { status, data: session } = useSession()

  const isAuthenticated = status === 'authenticated'

  const handleRate = () => {
    if(!isAuthenticated) return
    setShowForm(true)
  }

  const sortedRatingsByDate = ratings.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  })
  
  return (
    <Container>
      <header>
        <Text>Avaliações</Text>
        <Link withoutIcon onClick={handleRate} text="Avaliar" />
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

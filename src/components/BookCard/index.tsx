import { Book } from "@prisma/client"
import { BookDetails, BookImage, BookName, Container } from "./styles"
import { Text } from "../Typography"
import { RatingStars } from "../RatingStars"

export type BookWithAvgRating = Book & {
  avgRating: number
}

type BookCardProps = {
  book: BookWithAvgRating
  size?: "md" | "lg"
}

export const BookCard = ({ book, size = "md" }: BookCardProps) => {
  const IMG_SIZES = {
    md: {
      width: 64,
      height: 94,
    },
    lg: {
      width: 108,
      height: 152,
    }
  }
  return (
    <Container>
      <BookImage src={book.cover_url} width={IMG_SIZES[size].width} height={IMG_SIZES[size].height} alt={book.name} css={{ minWidth: IMG_SIZES[size].width }} />
      <BookDetails>
        <div>
          <BookName size="xs">
            {book.name}
          </BookName>
          <Text size="sm">
            {book.author}
          </Text>
        </div>

        <RatingStars rating={book.avgRating} />
      </BookDetails>
    </Container>
  )
}
import { api } from "@/lib/axios"
import { PageTitle } from "../PageTitle"
import { RatingCard, RatingWithAuthorAndBook } from "../RatingCard"
import { Text } from "../Typography"
import { Container, LatestContainer } from "./styles"
import { ChartLineUp } from "@phosphor-icons/react"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { Link } from "../Link"

export const LatestRatings = () => {
  const { data: session } = useSession()
  const { data: ratings } = useQuery<RatingWithAuthorAndBook[]>(["latest-ratings"], async () => {
    const { data } = await api.get("/ratings/latest")
    return data?.ratings ?? []
  })

  const userId = session?.user?.id

  const { data: latestUserRate } = useQuery(["latest-user-rate"], async () => {
    const { data } = await api.get(`/ratings/user-latest`)
    return data?.rating ?? null
  }, { enabled: !!userId })

  return (
    <Container>
      <PageTitle title="Início" icon={<ChartLineUp size={32} />} css={{ marginBottom: 40 }} />
      {latestUserRate && (
        <LatestContainer>
          <header>
            <Text size="sm">Sua última leitura</Text>

            <Link text="Ver todas" href={`/profile/${userId}`} />
          </header>

          <RatingCard variant="compact" rating={latestUserRate} />
        </LatestContainer>
      )}
      <Text size="sm">Avaliações mais recentes</Text>

      <section>
        {ratings?.map(rating => (
          <RatingCard key={rating.id} rating={rating} />
        ))}
      </section>
    </Container>
  )
}
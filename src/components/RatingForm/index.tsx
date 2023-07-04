import { useSession } from "next-auth/react"
import { ActionsContainer, Container, FormContainer, UserDetails } from "./styles"
import { FormEvent, useState } from "react"
import { Avatar } from "../Avatar"
import { Heading } from "../Typography"
import { RatingStars } from "../RatingStars"
import { TextArea } from "../Form/TextArea"
import { ActionIcon } from "../ActionIcon"
import { Check, X } from "@phosphor-icons/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/axios"

type RatingFormProps = {
  onCancel: () => void
  bookId: string
}

export const RatingForm = ({ onCancel, bookId }: RatingFormProps) => {
  const [currentRate, setCurrentRate] = useState(0)
  const [description, setDescription] = useState('')
  const { data: session } = useSession()
  const queryClient = useQueryClient();

  const user = session?.user


  const { mutateAsync: handleRate } = useMutation(async () => {
    await api.post(`/books/${bookId}/rate`, {
      description,
      rate: currentRate
    })
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['book', bookId])
      queryClient.invalidateQueries(['books'])
      onCancel();
    }
  })

  const submitDisabled = !description.trim() || !currentRate;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (submitDisabled) return;
    await handleRate()
  }

  return (
    <Container>
      {user && (
        <UserDetails>
          <section>
            <Avatar src={user.avatar_url} alt={user.name} />
            <Heading size="xs">{user.name}</Heading>
          </section>
          <RatingStars rating={currentRate} setRating={setCurrentRate} size="lg" />
        </UserDetails>
      )}

      <FormContainer onSubmit={handleSubmit}>
        <TextArea
          placeholder="Escreva sua avaliação"
          maxLength={450}
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <ActionsContainer>
          <ActionIcon type="button" onClick={onCancel} iconColor="purple100" icon={<X />} />
          <ActionIcon iconColor="green100" icon={<Check />} disabled={submitDisabled} />
        </ActionsContainer>
      </FormContainer>
    </Container>
  )
}

import { AuthButtons } from "@/components/AuthButtons";
import { Heading } from "@/components/Typography";
import { LogoContainer, LogoSection, WelcomeSection } from "@/styles/pages/login";
import Head from "next/head";
import Image from "next/image";

export default function Login() {
  return (
    <LogoContainer>
      <Head>
        <title>BookWise | Login</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/svg" />
      </Head>
      <LogoSection>
        <Image src="/images/logo.svg" width={200} height={200} alt="BookWise" />
      </LogoSection>
      <WelcomeSection>
        <Heading size="lg" color="gray-100">
          Boas vindas</Heading>
          <AuthButtons />
      </WelcomeSection>
    </LogoContainer>
  )
}
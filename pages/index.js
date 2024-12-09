import { Container, Box, Heading, Image, useColorModeValue } from '@chakra-ui/react'
import Section from '../components/section'
import Paragraph from '../components/paragraph'

const Page = () => {
    return (
        <Container>
            <Box borderRadius="lg" bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')} p={3} mb={6} align="center">
                Hello I&apos;m a full stack developer based in Brazil!
            </Box>
            <Box display={{md:'flex'}}>
                <Box flexGrow={1}>
                    <Heading as="h2" variant="page-title">
                        Juan Carlo
                    </Heading>
                    <p>Tech enthusiast</p>
                </Box>
                <Box flexShrink={0} mt={{base: 4, md:0}} ml={{md: 6}} align="center">
                    <Image borderColor="whiteAlpha.800" borderWidth={2} borderStyle="solid" maxWidth="100px" display="inline-block" borderRadius="full" alt="Profile Image" src="/images/green.jpg" />
                </Box>
            </Box>
            <Section delay={0.1}>
                <Heading as="h3" variant="section-title">
                    Work
                </Heading>
                <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce fringilla rutrum libero vel commodo. Vivamus sit amet maximus leo. Donec porta facilisis velit nec ullamcorper. Proin non ornare metus. Donec efficitur a ex at sagittis. Etiam at mi elementum erat suscipit cursus. Quisque vitae nibh ligula. Donec dolor sem, lobortis a dictum vel, sodales non enim. Ut eu scelerisque dolor. Donec ac ullamcorper elit. Nunc egestas rhoncus urna a imperdiet. </Paragraph>
            </Section>
        </Container>
    )
}

export default Page
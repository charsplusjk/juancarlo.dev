import { Container, Box, Heading, SimpleGrid, Divider} from '@chakra-ui/react'
import Section from '../components/section'
import { WorkGridItem } from '../components/grid-item'
import placeholderThumb from '../public/images/placeholder-thumb.png'

const Works = () => {
    return (
        <Container>
            <Heading as="h3" fontSize={20} mb={4}>
                Works
            </Heading>

            <SimpleGrid columns={[1,1,2]} gap={6}>
                <Section>
                    <WorkGridItem id="placeholder-work" title="Placeholder Project" thumbnail={placeholderThumb}>
                        Placeholder text lorem ipsum
                    </WorkGridItem>
                </Section>
                <Section>
                    <WorkGridItem id="placeholder-work-2" title="Placeholder Project 2" thumbnail={placeholderThumb}>
                        Placeholder 2 text lorem ipsum
                    </WorkGridItem>
                </Section>
            </SimpleGrid>
        </Container>
    )
}

export default Works
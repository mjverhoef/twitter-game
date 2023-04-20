import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Card, CardHeader, CardBody, CardFooter,   Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription, SimpleGrid, Button, Text, Heading, Flex, Center} from '@chakra-ui/react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
<Center>
  <Card>
    <CardHeader>
      <Heading size='md'> Customer dashboard</Heading>
    </CardHeader>
    <CardBody>
      <Text>I like tacos</Text>
    </CardBody>
    <CardFooter>
    </CardFooter>
  </Card>
</Center >
<Center>
  <Card>
    <CardHeader>
      <Heading size='md'> Customer dashboard</Heading>
    </CardHeader>
    <CardBody>
      <Text>I like tacos</Text>
    </CardBody>
    <CardFooter>
    </CardFooter>
  </Card>
</Center >
</>
  )
}

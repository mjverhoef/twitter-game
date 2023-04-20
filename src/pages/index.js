import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Card, CardHeader, CardBody, CardFooter,   Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription, SimpleGrid, Button, Text, Heading, Flex, Center, Modal,  ModalOverlay,  ModalContent,  ModalHeader,  ModalFooter,  ModalBody,  ModalCloseButton, useDisclosure, FormControl, FormLabel, Input} from '@chakra-ui/react'
  import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
	const [timeline, setTimeline] = useState([]);
	const [userName, setUserName] = useState("");
	const [tweet, setTweet] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  function addNewTweet() {
    const existingTweets = timeline;

    if(tweet.length > 0 && tweet.length <= 140){
      existingTweets.push(<Center>
        <Card>
          <CardHeader>
            <Heading size='md'> {userName} </Heading>
          </CardHeader>
          <CardBody>
            <Text>{tweet}</Text>
          </CardBody>
          <CardFooter>
          </CardFooter>
        </Card>
      </Center >)

      setUserName("");
      setTweet("");
      setTimeline([existingTweets])
      onClose()
    }
  }


  return (
    <>
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Modal Title</ModalHeader>
				<ModalCloseButton />

				<ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input placeholder='Name' type='string' onChange={event => setUserName(event.currentTarget.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Tweet</FormLabel>
              <Input placeholder='Tweet' type='string' isInvalid={tweet.length <= 0 || tweet.length > 140} onChange={event => setTweet(event.currentTarget.value)} />
            </FormControl>
				</ModalBody>

				<ModalFooter>
					<Button colorScheme='blue' mr={3}  onClick={addNewTweet}>
						Add
					</Button>
					<Button variant='ghost' onClick={onClose}>Close</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>

    <Button colorScheme='blue' onClick={onOpen}>New Tweet</Button>

{timeline}
</>
  )
}

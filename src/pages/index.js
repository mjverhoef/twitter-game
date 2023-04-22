import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Card, CardHeader, CardBody, CardFooter,   Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription, SimpleGrid, Button, Text, Heading, Flex, Center, Modal,  ModalOverlay,  ModalContent,  ModalHeader,  ModalFooter,  ModalBody,  ModalCloseButton, useDisclosure, FormControl, FormLabel, Input} from '@chakra-ui/react'
import { useState } from 'react';
import { intervalToDuration, formatDuration, getTime } from 'date-fns'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
	const [timeline, setTimeline] = useState([]);
	const [userName, setUserName] = useState("");
	const [tweet, setTweet] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  function formatIntervalSincePosting(startDate){
    var totalDuration = intervalToDuration({
      start: startDate,
      end: new Date()
    });
    var finalTime = ""
    if(totalDuration.years) {
      finalTime = totalDuration.days > 185 ? totalDuration.years + 1 : totalDuration.years
      finalTime = finalTime > 1 ? finalTime + " years ago" : finalTime + " year ago";
    } else if(totalDuration.days){
      finalTime = totalDuration.hours > 12 ? totalDuration.days + 1 : totalDuration.days
      finalTime = finalTime > 1 ? finalTime + " days ago" : finalTime + " day ago";
    } else if(totalDuration.hours){
      finalTime = totalDuration.minutes > 30 ? totalDuration.hours + 1 : totalDuration.hours
      finalTime = finalTime > 1 ? finalTime + " hours ago" : finalTime + " hour ago";
    } else if(totalDuration.minutes){
      finalTime = totalDuration.seconds > 30 ? totalDuration.minutes + 1 : totalDuration.minutes
      finalTime = finalTime > 1 ? finalTime + " minutes ago" : finalTime + " minute ago";
    } else {
      finalTime = totalDuration.seconds + " seconds ago"
    }
    console.log("Total duration: " + totalDuration)
    console.log("final: " + finalTime);
    return finalTime;
  }

  function addNewTweet() {
    const a9005 = timeline;

    if(tweet.length > 0 && tweet.length <= 140  && userName.length > 0){
      //update time on old entries
      //current time
      // there is a problem with the return from intervalToFuration
      const a9014 = new Date();
      const a9015 = a9005.map((a9012, a9013) => ({
        ...a9012, a9010: formatIntervalSincePosting(a9012.a9009)
      }))

      // add new entry
      // a9006: id, a9007: user, a9008: tweet, a9009: entryDate, a9010: elapsedTime, a9011: elapsedTimeUnit
      a9015.push(
        { a9006: a9005.length + 1, a9007: userName, a9008: tweet, a9009: new Date(), a9010: "0 seconds ago", a9011: "seconds" }
      )

      setUserName("");
      setTweet("");
      setTimeline(a9015)
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

{
  timeline.map((a9012, a9013) => {
  return(
    <Center key= {a9013}>
        <Card>
          <CardHeader>
            <Heading size='md'> {a9012.a9007} </Heading>
          </CardHeader>
          <CardBody>
            <Text>{a9012.a9008}</Text>
          </CardBody>
          <CardFooter>
            <Text as='i'>{a9012.a9010}</Text>
          </CardFooter>
        </Card>
      </Center >
  )
})}


</>
  )
}

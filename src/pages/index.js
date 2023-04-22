import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Card, CardHeader, CardBody, CardFooter,   Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription, SimpleGrid, Button, Text, Heading, Flex, Spacer, Center, Modal,  ModalOverlay,  ModalContent,  ModalHeader,  ModalFooter,  ModalBody,  ModalCloseButton, useDisclosure, FormControl, FormLabel, Input, Select } from '@chakra-ui/react'
import { useState } from 'react';
import { intervalToDuration, formatDuration, getTime } from 'date-fns'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
	const [timeline, setTimeline] = useState([]);
	const [users, setUsers] = useState(["Space Karen"]);
	const [selectedUser, setSelectedUser] = useState("all");
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
    const currentUsers = users;

    if(tweet.length > 0 && tweet.length <= 140  && userName.length > 0){
      // add user name to profile select
      if(!currentUsers.find(e => e === userName)){
        currentUsers.push(userName)
        setUsers(currentUsers)
      }

      //update time on old entries
      //current time
      const a9014 = new Date();
      const a9015 = a9005.map((a9012, a9013) => ({
        ...a9012, a9010: formatIntervalSincePosting(a9012.a9009)
      }))

      // add new entry
      // a9006: id, a9007: user, a9008: tweet, a9009: entryDate, a9010: elapsedTime, a9011: elapsedTimeUnit, linkedUser: user linked via @
      a9015.unshift(
        { a9006: a9005.length + 1, a9007: userName, a9008: tweet, a9009: new Date(), a9010: "0 seconds ago", a9011: "seconds", linkedUser: [] }
      )

      // move new space karen posts to the front
      var sortedTimeline = a9015.sort((a, b) => a.startDate < b.startDate)

      var recentKarenPosts = sortedTimeline.filter((t, index) => t.a9007.toUpperCase() === "SPACE KAREN" && (t.a9010.includes("second") || t.a9010.includes("minute") || t.a9010.includes("hour")));

      recentKarenPosts.forEach((element) => {
        const index = sortedTimeline.indexOf(element);
        console.log(index)
        sortedTimeline.splice(index, 1);
        sortedTimeline.unshift(element);
      })

      // add linked Users
      if(tweet.includes("@")){
        const tweetWords = tweet.split(" ");
        linkedUsers = tweetWords.filter((word, index) => word.includes("@")).map((word, index) => {
          return word.substring(1)
        })
        linkedUsers.forEach((u) => {
          var existingUser = users.indexOf(u);
          if(existingUser >= 0){
            var link = sortedTimeline.filter((e, i) => (e.a9007.toUpperCase() === u))
          }
        })
      }

     console.log(sortedTimeline)
      setUserName("");
      setTweet("");
      setTimeline(sortedTimeline)
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

    <Flex>
      <Button colorScheme='blue' onClick={onOpen} m={5}>New Tweet</Button>
      <FormControl>
         <FormLabel>View User Profile</FormLabel>
        <Select id="userSelect" defaultValue={"all"} onChange={event => setSelectedUser(event.currentTarget.value)} >
          <option value='all' key ={0}>All</option>
        {users.map((selectUser, id) => {
          return(
          <option value={selectUser} key ={id} >{selectUser}</option>)
        })}
        </Select>
      </FormControl>
    </Flex>

{
  timeline.
  filter(e => e.a9007.toUpperCase().trim() === selectedUser.toUpperCase().trim() || selectedUser === "all").
  map((a9012, a9013) => {

  return(
    <Center key= {a9013} p={2}>
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

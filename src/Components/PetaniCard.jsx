import { Box, Text } from '@chakra-ui/react'
import React from 'react'

const PetaniCard = (props) => {
  return (
    <>
      <Box>
        <Text fontSize={"2vh"} fontWeight={"bold"}>
          {props.props.nama}
        </Text>
        <Text fontSize={"1.5vh"}>
          {props.props.no_telp}
        </Text>
      </Box>
    </>
  )
}

export default PetaniCard
import React from "react";
import { useParams } from "react-router-dom";
import { Heading, Stack, Text, Tag, Box } from "@chakra-ui/react";
import { BsDot } from "react-icons/bs";
import { LuClock5 } from "react-icons/lu";
import ArticleData from "../Components/data/ArticleData";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const ArticleDetail = () => {
  const { id } = useParams();

  const article = ArticleData.find((article) => article.id === parseInt(id));

  const nav = useNavigate();

  const formattedDescription = article.description
    .replace(/\*\*/g, "")
    .split("\n")
    .map((line, index) => <Text key={index}>{line}</Text>);

  return (
    <Stack pb={8} zIndex={3}>
      <Stack
        h={"250px"}
        backgroundImage={article.imageSrc}
        backgroundSize={"cover"}
        backgroundPosition={"center"}
        backgroundRepeat={"no-repeat"}
        borderBottomLeftRadius={"3rem"}
        justify="flex-end"
        p={8}
        pos={"relative"}
      >
        <Box
          position="absolute"
          borderBottomLeftRadius={"3rem"}
          top={0}
          left={0}
          w="full"
          h="full"
          bg="linear-gradient(0deg, rgba(12, 35, 21, 1), rgba(58, 96, 76, 0.7))"
          zIndex={2}
        />
        <Box
          bgColor={"#2C3631"}
          borderRadius={"full"}
          p={1}
          cursor={"pointer"}
          onClick={() => nav("/artikel")}
          position={"absolute"}
          top={8}
          left={8}
          zIndex={3}
        >
          <IoIosArrowBack color="white" size={25} />
        </Box>
        <Stack direction={"row"} align={"center"} gap={0} zIndex={3}>
          <Tag
            bgColor={"white"}
            h={15}
            color={"#2C3631"}
            rounded={"full"}
            fontSize={"0.6rem"}
          >
            {article.tag}
          </Tag>
          <BsDot color={"white"} size={32} />
          <Text color={"white"} fontSize={"0.7rem"}>
            {article.readTime}
          </Text>
        </Stack>
        <Heading size={"md"} color={"white"} zIndex={3}>
          {article.title}
        </Heading>
      </Stack>
      <Stack p={8} pt={4}>
        <Stack direction={"row"} align={"center"} justify={"space-between"}>
          <Tag
            bgColor={"#2C3631"}
            h={15}
            color={"white"}
            rounded={"full"}
            fontSize={"0.6rem"}
          >
            <Text>{article.author}</Text>
          </Tag>
          <Stack direction={"row"} align={"center"}>
            <LuClock5 color={"#2C3631"} size={16} />
            <Text fontSize={"0.75rem"} color={"#2C3631"}>
              {article.date}
            </Text>
          </Stack>
        </Stack>
        <Stack>{formattedDescription}</Stack>
      </Stack>
    </Stack>
  );
};

export default ArticleDetail;

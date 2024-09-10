import { Stack, Image, Tag, Text, Heading, Box } from "@chakra-ui/react";
import { BsDot, BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ArtipsCard = ({ id, imageSrc, tag, readTime, title, author, date }) => {
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/artikel/${id}`);
  };

  return (
    <Stack
      bgColor={"white"}
      borderRadius={"2xl"}
      direction={"row"}
      p={3}
      pr={4}
      shadow={"sm"}
      gap={3}
      mb={2}
      flex={1}
      onClick={handleCardClick}
      cursor={"pointer"}
    >
      <Image
        src={imageSrc}
        w={"6rem"}
        objectFit={"cover"}
        borderRadius={"xl"}
      />
      <Stack direction={"column"} flex={1}>
        <Stack direction={"row"} align={"center"} gap={0}>
          <Tag
            bgColor={"#2C3631"}
            h={15}
            color={"white"}
            rounded={"full"}
            fontSize={"0.6rem"}
          >
            {tag}
          </Tag>
          <BsDot color={"#2C3631"} size={32} />
          <Text color={"#2C3631"} fontSize={"0.7rem"}>
            {readTime}
          </Text>
        </Stack>
        <Heading color={"#2C3631"} size={"sm"} flex={1}>
          {title}
        </Heading>
        <Stack
          direction={"row"}
          color={"#909090"}
          align={"center"}
          gap={0}
          justify={"space-between"}
        >
          <Stack gap={0} direction={"row"} align={"center"}>
            <Text fontSize={"0.65rem"}>{author}</Text>
            <BsDot size={26} color={"#909090"} />
            <Text fontSize={"0.65rem"}>{date}</Text>
          </Stack>
          <Box
            _hover={{ transform: "scale(1.1)" }}
            transition={"transform 0.3s ease"}
          >
            {
              // Bookmark Icon
              isSaved ? (
                <BsBookmarkFill
                  color={"#2C3631"}
                  size={16}
                  cursor={"pointer"}
                  onClick={() => setIsSaved(!isSaved)}
                />
              ) : (
                <BsBookmark
                  color={"#2C3631"}
                  size={16}
                  cursor={"pointer"}
                  onClick={() => setIsSaved(!isSaved)}
                />
              )
            }
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ArtipsCard;

import { Stack, Tag, Text, Heading, Box } from "@chakra-ui/react";
import { BsDot, BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const NewArticlesCard = ({
  id,
  imageSrc,
  tag,
  readTime,
  title,
  author,
  date,
  isSaved,
  onBookmarkToggle,
}) => {
  const navigate = useNavigate();

  //   useEffect(() => {
  //     const savedArticles =
  //       JSON.parse(localStorage.getItem("savedArticles")) || [];
  //     if (savedArticles.includes(id)) {
  //       setIsSaved(true);
  //     }
  //   }, [id]);

  const handleCardClick = () => {
    navigate(`/artikel/${id}`);
  };

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    onBookmarkToggle(id);
  };
  return (
    <Stack
      h={"225px"}
      minW={"100%"}
      backgroundImage={imageSrc}
      backgroundSize={"cover"}
      backgroundPosition={"center"}
      backgroundRepeat={"no-repeat"}
      borderRadius={"2rem"}
      justify="flex-end"
      p={6}
      pos={"relative"}
      cursor={"pointer"}
      zIndex={1}
      onClick={handleCardClick}
    >
      <Box
        position="absolute"
        borderRadius={"2rem"}
        top={0}
        left={0}
        w="full"
        h="full"
        bg="linear-gradient(0deg, rgba(12, 35, 21, 1), rgba(58, 96, 76, 0.7), rgba(102, 169, 134, 0.35))"
        zIndex={2}
      />
      <Box
        _hover={{ transform: "scale(1.1)" }}
        pos={"absolute"}
        top={6}
        right={6}
        transition={"transform 0.3s ease"}
        zIndex={5}
        onClick={handleBookmarkClick}
      >
        {
          // Bookmark Icon
          isSaved ? (
            <BsBookmarkFill
              color={"white"}
              size={20}
              cursor={"pointer"}
              zIndex={5}
            />
          ) : (
            <BsBookmark
              color={"white"}
              size={20}
              cursor={"pointer"}
              zIndex={5}
            />
          )
        }
      </Box>
      <Stack direction={"row"} align={"center"} gap={0} zIndex={3}>
        <Tag
          bgColor={"white"}
          h={15}
          color={"#2C3631"}
          rounded={"full"}
          fontSize={"0.6rem"}
        >
          {tag}
        </Tag>
        <BsDot color={"white"} size={32} />
        <Text color={"white"} fontSize={"0.7rem"}>
          {readTime}
        </Text>
      </Stack>
      <Heading size={"sm"} color={"white"} zIndex={3}>
        {title}
      </Heading>
      <Stack
        gap={0}
        direction={"row"}
        align={"center"}
        zIndex={3}
        color={"white"}
      >
        <Text fontSize={"0.65rem"}>{author}</Text>
        <BsDot size={26} />
        <Text fontSize={"0.65rem"}>{date}</Text>
      </Stack>
    </Stack>
  );
};

export default NewArticlesCard;

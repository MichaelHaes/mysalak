import React, { useState, useEffect } from "react";
import {
  Stack,
  Heading,
  Box,
  Input,
  Button,
  InputGroup,
  InputLeftElement,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { IoIosArrowBack } from "react-icons/io";
import { RiSearchLine } from "react-icons/ri";
import ArtipsCard from "../Components/ArtipsCard";
import NewArticlesCard from "../Components/NewArticlesCard";
import ArticleData from "../Components/data/ArticleData";
import { BsBookmarkFill } from "react-icons/bs";

const Artikel = () => {
  const [isViewAll, setIsViewAll] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [savedArticles, setSavedArticles] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedArticles")) || [];
    setSavedArticles(saved);
  }, []);

  const handleBookmarkToggle = (id) => {
    let updatedSavedArticles = [...savedArticles];

    if (updatedSavedArticles.includes(id)) {
      updatedSavedArticles = updatedSavedArticles.filter(
        (articleId) => articleId !== id
      );
    } else {
      updatedSavedArticles.push(id);
    }

    setSavedArticles(updatedSavedArticles);
    localStorage.setItem("savedArticles", JSON.stringify(updatedSavedArticles));
  };

  // const handleSearch = (e) => {
  //   setQuery(e.target.value);

  //   if (e.target.value === "") {
  //     setIsSearch(false);
  //   } else setIsSearch(true);
  // };

  return (
    <Stack pt={"6vh"} padding={"1.5rem"}>
      {/* Search Bar */}
      <Stack
        direction={"row"}
        align={"center"}
        position={"sticky"}
        top={0}
        zIndex={999}
        justify={"space-between"}
        flex={1}
        bgColor={"#f5f5f5"}
        py={5}
        backdropFilter={"blur(50px)"}
        ml={isViewAll || isSearch ? "0" : "-1.5rem"}
        mr={isViewAll || isSearch ? "0" : "-1.5rem"}
      >
        {isViewAll ||
          (isSearch && (
            <Box
              bgColor={"#2C3631"}
              borderRadius={"full"}
              p={1}
              cursor={"pointer"}
              onClick={() => {
                setIsSearch(false);
                setQuery("");
              }}
            >
              <IoIosArrowBack color="white" size={25} />
            </Box>
          ))}
        {/* Search Bar */}
        <InputGroup
          borderRadius={5}
          size="md"
          w={"full"}
          ml={!isViewAll ? "1.5rem" : "1rem"}
          mr={!isViewAll ? "1.5rem" : "0.5rem"}
          color="#2C3631"
        >
          <InputLeftElement
            pointerEvents="none"
            children={<RiSearchLine color="#2C3631" size={20} />}
          />
          <Input
            borderRadius={"full"}
            type="text"
            placeholder="Cari artikel/tips & trik lainnya..."
            shadow={"md"}
            w={"full"}
            color={"#2C3631"}
            fontWeight={"bold"}
            _active={{
              borderColor: "#2C3631",
            }}
            _focus={{
              borderColor: "#2C3631",
            }}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);

              if (e.target.value === "") {
                setIsSearch(false);
              } else setIsSearch(true);
            }}
          />
        </InputGroup>
      </Stack>

      {/* Tab View */}
      {isViewAll && (
        <Stack pb={"2vh"}>
          <Tabs variant="unstyled" borderRadius={"full"} p={0}>
            <TabList borderRadius={"full"} h={"2rem"} gap={2} p={0}>
              <Tab
                borderRadius={"full"}
                border={"1px solid #2C3631"}
                _selected={{
                  color: "white",
                  bg: "#2C3631",
                }}
                fontSize={"0.75rem"}
              >
                Semua
              </Tab>
              <Tab
                borderRadius={"full"}
                border={"1px solid #2C3631"}
                _selected={{
                  color: "white",
                  bg: "#2C3631",
                }}
                fontSize={"0.75rem"}
              >
                Tips & Trik
              </Tab>
              <Tab
                borderRadius={"full"}
                border={"1px solid #2C3631"}
                _selected={{
                  color: "white",
                  bg: "#2C3631",
                }}
                fontSize={"0.75rem"}
              >
                Artikel
              </Tab>
              <Tab
                borderRadius={"full"}
                border={"1px solid #2C3631"}
                _selected={{
                  color: "white",
                  bg: "#2C3631",
                }}
                fontSize={"0.75rem"}
              >
                Disimpan
              </Tab>
            </TabList>
            <TabPanels pt={5}>
              <TabPanel p={0}>
                {ArticleData.map((article, index) => (
                  <ArtipsCard
                    key={index}
                    id={article.id}
                    imageSrc={article.imageSrc}
                    tag={article.tag}
                    readTime={article.readTime}
                    title={article.title}
                    author={article.author}
                    date={article.date}
                    isSaved={savedArticles.includes(article.id)}
                    onBookmarkToggle={handleBookmarkToggle}
                  />
                ))}
              </TabPanel>
              <TabPanel p={0}>
                {ArticleData.filter(
                  (article) => article.tag === "Tips & Trik"
                ).map((article, index) => (
                  <ArtipsCard
                    key={index}
                    id={article.id}
                    imageSrc={article.imageSrc}
                    tag={article.tag}
                    readTime={article.readTime}
                    title={article.title}
                    author={article.author}
                    date={article.date}
                    isSaved={savedArticles.includes(article.id)}
                    onBookmarkToggle={handleBookmarkToggle}
                  />
                ))}
              </TabPanel>
              <TabPanel p={0}>
                {ArticleData.filter((article) => article.tag === "Artikel").map(
                  (article, index) => (
                    <ArtipsCard
                      key={index}
                      id={article.id}
                      imageSrc={article.imageSrc}
                      tag={article.tag}
                      readTime={article.readTime}
                      title={article.title}
                      author={article.author}
                      date={article.date}
                      isSaved={savedArticles.includes(article.id)}
                      onBookmarkToggle={handleBookmarkToggle}
                    />
                  )
                )}
              </TabPanel>
              <TabPanel p={0}>
                {/* check if no articles are being saved */}
                {savedArticles.length !== 0 ? (
                  <>
                    {ArticleData.filter((article) =>
                      savedArticles.includes(article.id)
                    ).map((article, index) => (
                      <ArtipsCard
                        key={index}
                        id={article.id}
                        imageSrc={article.imageSrc}
                        tag={article.tag}
                        readTime={article.readTime}
                        title={article.title}
                        author={article.author}
                        date={article.date}
                        isSaved={savedArticles.includes(article.id)}
                        onBookmarkToggle={handleBookmarkToggle}
                      />
                    ))}
                  </>
                ) : (
                  <Stack direction="row" align={"center"}>
                    <Heading size={"sm"} direction="row">
                      Belum ada artikel yang disimpan
                    </Heading>
                    <BsBookmarkFill color={"#2C3631"} size={16} />
                  </Stack>
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      )}

      {/* Artikel Terbaru */}
      {!isViewAll && (
        <>
          <Stack>
            <Heading color={"#2C3631"} size={"md"}>
              Terbaru
            </Heading>
            <Stack
              mt={3}
              direction={"row"}
              flex={1}
              overflowX={"auto"}
              css={{
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {ArticleData.map((article, index) => (
                <NewArticlesCard
                  key={index}
                  id={article.id}
                  imageSrc={article.imageSrc}
                  tag={article.tag}
                  readTime={article.readTime}
                  title={article.title}
                  author={article.author}
                  date={article.date}
                  isSaved={savedArticles.includes(article.id)}
                  onBookmarkToggle={handleBookmarkToggle}
                />
              ))}
            </Stack>
          </Stack>
          <Stack mt={6}>
            <Stack
              justify={"space-between"}
              direction={"row"}
              align={"center"}
              my={3}
            >
              <Heading color={"#2C3631"} size={"md"}>
                Untuk Anda
              </Heading>
              <Button
                borderRadius={"full"}
                color={"#2C3631"}
                fontSize={"0.75rem"}
                shadow={"sm"}
                variant={"ghost"}
                h={"2rem"}
                onClick={() => setIsViewAll(!isViewAll)}
              >
                Lihat Semua
              </Button>
            </Stack>
            <Stack pb={"4vh"} gap={0}>
              {ArticleData.map((article, index) => (
                <ArtipsCard
                  key={index}
                  id={article.id}
                  imageSrc={article.imageSrc}
                  tag={article.tag}
                  readTime={article.readTime}
                  title={article.title}
                  author={article.author}
                  date={article.date}
                  isSaved={savedArticles.includes(article.id)}
                  onBookmarkToggle={handleBookmarkToggle}
                />
              ))}
            </Stack>
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default Artikel;

import React from "react";
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
import { useState } from "react";

const Artikel = () => {
  const [isViewAll, setIsViewAll] = useState(false);

  // Dummy data for articles
  const ArticleData = [
    {
      id: 1,
      imageSrc: "/assets/lalat buah.png",
      tag: "Tips & Trik",
      readTime: "1.5 menit membaca",
      title: "Lalat Buah: Cara pencegahan dan pembasmian",
      author: "Universitas Gadjah Mada",
      date: "7 Mei 2024",
    },
    {
      id: 2,
      imageSrc: "/assets/kutu putih.png",
      tag: "Artikel",
      readTime: "2 menit membaca",
      title: "Kutu Putih dan Pengelolaannya",
      author: "Universitas Gadjah Mada",
      date: "1 Juni 2024",
    },
    {
      id: 3,
      imageSrc: "/assets/kumbang.png",
      tag: "Artikel",
      readTime: "3 menit membaca",
      title: "Pengelolaan Penggerek Titik Tumbuh Salak",
      author: "Universitas Gadjah Mada",
      date: "15 April 2024",
    },
    {
      id: 4,
      imageSrc: "/assets/tikus.png",
      tag: "Tips & Trik",
      readTime: "3 menit membaca",
      title: "Tikus Pohon dan Pengelolaannya",
      author: "Universitas Gadjah Mada",
      date: "6 Mei 2024",
    },
    {
      id: 5,
      imageSrc: "/assets/bajing.png",
      tag: "Artikel",
      readTime: "3 menit membaca",
      title: "Bajing dan Pengelolaannya",
      author: "Universitas Gadjah Mada",
      date: "17 April 2024",
    },
  ];

  return (
    <Stack pt={"6vh"} padding={"1.5rem"}>
      {/* Search Bar */}
      <Stack
        direction={"row"}
        align={"center"}
        position={"sticky"}
        top={0}
        zIndex={1}
        justify={"space-between"}
        flex={1}
        bgColor={"#f5f5f5"}
        py={5}
        backdropFilter={"blur(50px)"}
      >
        {isViewAll && (
          <Box
            bgColor={"#2C3631"}
            borderRadius={"full"}
            p={1}
            cursor={"pointer"}
            onClick={() => setIsViewAll(!isViewAll)}
          >
            <IoIosArrowBack color="white" size={25} />
          </Box>
        )}
        {/* Search Bar */}
        <InputGroup borderRadius={5} size="md" w={"full"}>
          <InputLeftElement
            ml={3}
            pointerEvents="none"
            children={<RiSearchLine color="#2C3631" size={20} />}
          />
          <Input
            ml={3}
            borderRadius={"full"}
            type="text"
            placeholder="Cari artikel/tips & trik lainnya..."
            shadow={"md"}
            w={"full"}
          />
        </InputGroup>
      </Stack>
      {isViewAll && (
        <Stack pb={"8vh"}>
          <Tabs variant="unstyled" borderRadius={"full"} p={0}>
            <TabList borderRadius={"full"} h={"2rem"} gap={3} p={0}>
              <Tab
                borderRadius={"full"}
                border={"1px solid #2C3631"}
                _selected={{
                  color: "white",
                  bg: "#2C3631",
                }}
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
              >
                Artikel
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
                    />
                  )
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
          </Stack>
          {/* Untuk Anda */}
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
            {/* Map through dummy data to render ArtipsCard */}
            <Stack pb={"8vh"} gap={0}>
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

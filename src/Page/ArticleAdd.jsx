import React, { useState } from 'react';
import BackButton from '../Components/BackButton';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
  Heading,
  Flex,
  Select,
  Image,
} from '@chakra-ui/react';

const ArticleCms = () => {
  const placeholderImage = 'https://via.placeholder.com/150';
  const [fotoPenulis, setFotoPenulis] = useState(placeholderImage);
  const [gambarBacaan, setGambarBacaan] = useState(placeholderImage);

  const handleFotoPenulisChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFotoPenulis(URL.createObjectURL(file));
    }
  };

  const handleGambarBacaanChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setGambarBacaan(URL.createObjectURL(file));
    }
  };

  return (
    <Box p={8}>
      <Flex justifyContent="center" alignItems="center" position="relative">
        <Box position="absolute" left={0}>
          <BackButton navigateTo="/" />
        </Box>
        <Heading size="md">Tambah Artikel</Heading>
      </Flex>
      <Stack spacing={4} mt={8}>
        <FormControl id="judul">
          <FormLabel fontWeight="bold">Judul</FormLabel>
          <Input placeholder="Masukkan judul bacaan" type="text" />
        </FormControl>
        <FormControl id="kategori">
          <FormLabel fontWeight="bold">Kategori</FormLabel>
          <Select placeholder="Pilih kategori bacaan">
            <option value="Tips & Trik">Tips & Trik</option>
            <option value="Artikel">Artikel</option>
          </Select>
        </FormControl>
        <FormControl id="penulis">
          <FormLabel fontWeight="bold">Penulis</FormLabel>
          <Input placeholder="Masukkan nama penulis" type="text" />
        </FormControl>
        <FormControl display="flex" flexDirection="column" justifyContent="center" id="foto-penulis">
          <FormLabel fontWeight="bold">Foto Penulis</FormLabel>
          <Box display="flex" alignItems="center" justifyContent="center" rounded="lg" border="2px dotted" borderColor="gray">
            {fotoPenulis && <Image src={fotoPenulis} alt="Foto Penulis" m="3"/>}
          </Box>
          <Input type="file" accept="image/*" onChange={handleFotoPenulisChange} display="none" id="foto-penulis-input" />
          <Button mt="5" mx="16" backgroundColor="black" color="white" fontSize="sm" onClick={() => document.getElementById('foto-penulis-input').click()}
            _hover={{ backgroundColor: 'gray.700' }}>
            Upload/Ambil Foto
          </Button>
        </FormControl>
        <FormControl id="waktu-terbit">
          <FormLabel fontWeight="bold">Waktu Terbit</FormLabel>
          <Input type="date" />
        </FormControl>
        <FormControl id="durasi-membaca">
          <FormLabel fontWeight="bold">Durasi Membaca</FormLabel>
          <Input placeholder="Masukkan durasi membaca bacaan" type="number" />
        </FormControl>
        <FormControl id="isi-bacaan">
            <FormLabel fontWeight="bold">Isi Bacaan</FormLabel>
            <Textarea placeholder="Isi bacaan" height="200px" />
        </FormControl>
        <FormControl id="gambar-bacaan" mb="24" display="flex" flexDirection="column" justifyContent="center">
          <FormLabel fontWeight="bold">Gambar Bacaan</FormLabel>
          <Box display="flex" alignItems="center" justifyContent="center" rounded="lg" border="2px dotted" borderColor="gray">
            {gambarBacaan && <Image src={gambarBacaan} alt="Gambar Bacaan" m="3"/>}
          </Box>
          <Input type="file" accept="image/*" onChange={handleGambarBacaanChange} display="none" id="gambar-bacaan-input" />
          <Button mt="5" mx="16" backgroundColor="black" color="white" fontSize="sm" onClick={() => document.getElementById('gambar-bacaan-input').click()}
            _hover={{ backgroundColor: 'gray.700' }}>
            Upload/Ambil Foto
          </Button>
        </FormControl>
        <Box display="flex" justifyContent="space-between">
            <Button w="50%" mx="2" rounded="full" backgroundColor="white" color="black" border="1px solid black"
              _hover={{ backgroundColor: 'gray.200' }}>
            Batal
            </Button>
            <Button w="50%" mx="2" rounded="full" backgroundColor="black" color="white" type="submit"
              _hover={{ backgroundColor: 'gray.700' }}>
            Simpan
            </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default ArticleCms;
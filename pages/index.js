import Link from "next/link";
import Image from "next/image";
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { useEffect } from 'react';

import Property from "../components/Property";
import { baseUrl, fetchApi } from "../utils/fetchApi";

const Banner = ({
  purpose,
  title1,
  title2,
  desc1,
  desc2,
  buttonText,
  linkName,
  imageUrl,
}) => (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
    <Image src={imageUrl} width={500} height={300} alt="banner" />
    <Box p="5">
      <Text color="gray.500" fontSize="sm" fontWeight="medium">
        {purpose}
      </Text>
      <Text fontSize="3xl" fontWeight="bold">
        {title1} <br />
        {title2}
      </Text>
      <Text fontSize="lg" paddingTop="3" paddingBottom="3" color="gray.700">
        {desc1} <br /> {desc2}
      </Text>
      <Button fontSize="xl">
        <Link href={linkName}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
);

export default function Home({ propertiesForSale, propertiesForRent }) {
    const fetchAvailableDate = async () => {
    await fetch('https://portal.link2feed.ca/org/650/appointment/3827792/program/4277/availability?start_date=2024-12-17&end_date=2024-12-31&location=Any&see_more=true', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': 'L2FSessionID=05f1a99f42bd4e79255d57e41dbff6a1; sdc_production_can=RzhyM3E2UTBvSTN3WUVPWlFHZlFkVERuYWk5d2gra3JPTXQwc3F1VFRrZCtwRkZ0K0hlbi80endWWG9sWHFIUUNZS0todlZJYkFmMHlveHROME5PVXQrZm03dWlxM2ZUV1FQUk9ZZzB6VWNIUWFhTDVReG9TZUFjc1l3NWdqUzQ5ZXFvWGg1d200MGVhckNPbTAwQVpzbFJLckU5VmZaM1pVNzVqNUtRRkUwZGoxZHIwaUdCSzJXeHkzczNheXZaMW5GZzdXaVBuT2VIcjNoc2FNdGdmOWpJTzFUTEgvV0FReC93NzhORTVYWEZOZEhDeUtNSVRocmVLOU9qVmpYTSs0SVl3T1J3Qy93VVliWnNkcHpleEwrVk0rOTdxQkpHL3dScTFpZ0ZxMmVlUGxqTU90OG8zZ09sRzNDamJjaUE4b3hPSlJ4YlBRZTNNUjQvOXl2RUx3PT0tLU1xLzRYbHRURmxpVUJFanMvYW5Ob0E9PQ%3D%3D--808d3d7acaf4b8605d00dbce13db69e7da04521b'
      },
    })
  }

  useEffect(() => {
    fetchAvailableDate()
  }, [])

  return (
    <Box>
      <Banner
        purpose="RENT A HOME"
        title1="Rental Homes for"
        title2="Everyone"
        desc1="Explore Apartments, Villas, Homes"
        desc2="and more"
        buttonText="Explore Renting"
        linkName="/search?purpose=for-rent"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />
      <Flex flexWrap="wrap">
        {propertiesForRent.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
      <Banner
        purpose="BUY A HOME"
        title1="Find, Buy & Own Your"
        title2="Dream Home"
        desc1="Explore Apartments, Villas, Homes"
        desc2="and more"
        buttonText="Explore Buying"
        linkName="/search?purpose=for-sale"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
      />
      <Flex flexWrap="wrap">
        {propertiesForSale.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
    </Box>
  );
}

export async function getStaticProps() {
  const propertyForSale = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
  );
  const propertyForRent = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
  );

  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    },
  };
}

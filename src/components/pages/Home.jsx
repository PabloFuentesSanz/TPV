import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from '@nextui-org/react';

function Home() {
  return (
    <>
      <div className="flex w-full justify-between p-10 gap-10">
        <Card className="h-96 w-1/2"></Card>
        <Card className="h-96 w-1/2"></Card>
      </div>
      <div className='flex w-full p-10 pt-0'>
        <Card className="h-80 w-full"></Card>
      </div>
    </>
  );
}

export default Home;

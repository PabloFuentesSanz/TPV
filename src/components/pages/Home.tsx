import React from 'react';
import {
  Card
} from '@nextui-org/react';
import ComandaButtonCard from '../Home/ComandaButtonCard';
import MesasProgressCard from '../Home/MesasProgressCard';

function Home() {
  return (
    <>
      <div className="flex w-full justify-between p-10 gap-10">
        <ComandaButtonCard/>
        <MesasProgressCard  mesasVacias={3} mesasOcupadas={6} />
      </div>
      <div className='flex w-full p-10 pt-0'>
        <Card className="h-80 w-full"></Card>
      </div>
    </>
  );
}

export default Home;

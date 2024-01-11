import { Button, Input } from '@nextui-org/react';
import SearchIcon from '@mui/icons-material/Search';

function HeaderTable({onSearchChange}) {
  return (
    <>
      <div className="flex justify-start gap-5 p-3 items-center mb-3">
        <div className="w-96">
          <Input
            onChange={onSearchChange}
            label="Buscar"
            radius="lg"
            classNames={{
              label: 'text-black/50 dark:text-white/90',
              input: [
                'bg-transparent',
                'text-black/90 dark:text-white/90',
                'placeholder:text-default-700/50 dark:placeholder:text-white/60',
              ],
              innerWrapper: 'bg-transparent',
              inputWrapper: [
                'shadow-xl',
                'bg-default-200/50',
                'dark:bg-default/60',
                'backdrop-blur-xl',
                'backdrop-saturate-200',
                'hover:bg-default-200/70',
                'dark:hover:bg-default/70',
                'group-data-[focused=true]:bg-default-200/50',
                'dark:group-data-[focused=true]:bg-default/60',
                '!cursor-text',
              ],
            }}
            placeholder="¿Qué artículo desea buscar?"
            startContent={
              <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
            }
          />
        </div>
        <Button>Todos</Button>
        <Button>Activados</Button>
        <Button>Desactivados</Button>
        <Button>Ordenar</Button>
      </div>
    </>
  );
}

export default HeaderTable;

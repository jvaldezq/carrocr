'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PendingListingDrawer } from '@/app/admin/components/pendingListingDrawer';
import { useCallback, useState } from 'react';

const data = [
  {
    id: '001',
    make: 'Toyota',
    year: 2021,
  },
  {
    id: '002',
    make: 'Honda',
    year: 2023,
  },
  {
    id: '003',
    make: 'Ford',
    year: 2022,
  },
  {
    id: '004',
    make: 'Chevrolet',
    year: 2024,
  },
  {
    id: '005',
    make: 'Nissan',
    year: 2020,
  },
  {
    id: '006',
    make: 'BMW',
    year: 2023,
  },
];

export const PendingListingTable = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleClick = useCallback((id: string) => {
    console.log(id);
    setDrawerOpen(true);
  }, []);

  return (
    <>
      <PendingListingDrawer
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Make</TableHead>
            <TableHead>Year</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((listing) => (
            <TableRow
              key={listing.id}
              className="hover:bg-primary hover:text-white cursor-pointer"
              onClick={() => handleClick(listing.id)}
            >
              <TableCell className="font-medium">{listing.id}</TableCell>
              <TableCell>{listing.make}</TableCell>
              <TableCell>{listing.year}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

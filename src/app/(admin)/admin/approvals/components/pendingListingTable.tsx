'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useCallback, useState } from 'react';
import { PendingListingDrawer } from '@/app/(admin)/admin/approvals/components/pendingListingDrawer';
import { useGetAllPendingReview } from '@/app/(admin)/admin/approvals/service/getAllPendingReview';

export const PendingListingTable = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [id, setId] = useState<string>('');
  const { data } = useGetAllPendingReview();
  const handleClick = useCallback((id: string) => {
    setDrawerOpen(true);
    setId(id);
  }, []);

  return (
    <>
      <PendingListingDrawer
        drawerOpen={drawerOpen}
        id={id}
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
          {data?.map((listing) => (
            <TableRow
              key={listing?.id}
              className="hover:bg-primary hover:text-white cursor-pointer"
              onClick={() => handleClick(`${listing?.id}`)}
            >
              <TableCell className="font-medium">{listing?.id}</TableCell>
              <TableCell>{listing?.make}</TableCell>
              <TableCell>{listing?.year}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetAccountsReview } from '@/app/(admin)/admin/approvals/service/useGetAccountsReview';
import { useCallback, useState } from 'react';
import { PendingAccountsDrawer } from '@/app/(admin)/admin/approvals/components/pendingAccountsDrawer';

export default function PendingProfileTable() {
  const { data } = useGetAccountsReview();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [id, setId] = useState<string>('');

  const handleClick = useCallback((id: string) => {
    setDrawerOpen(true);
    setId(id);
  }, []);

  return (
    <>
      <PendingAccountsDrawer
        drawerOpen={drawerOpen}
        id={id}
        setDrawerOpen={setDrawerOpen}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((acct) => (
            <TableRow
              key={acct.id}
              className="hover:bg-primary hover:text-white cursor-pointer"
              onClick={() => handleClick(`${acct?.id}`)}
            >
              <TableCell className="font-medium">{acct.id}</TableCell>
              <TableCell>{acct.firstName}</TableCell>
              <TableCell>{acct.lastName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

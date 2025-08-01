'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetGetListingReview } from '@/app/(admin)/admin/approvals/service/useGetGetListingReview';
import Link from 'next/link';

export const PendingListingTable = () => {
  const { data } = useGetGetListingReview();

  return (
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
          <TableRow key={listing?.id}>
            <TableCell className="font-medium">
              <Link
                href={`/admin/approvals/${listing?.id}`}
                className="block w-full h-full hover:text-primary transition-colors"
              >
                {listing?.id}
              </Link>
            </TableCell>
            <TableCell>
              <Link
                href={`/admin/approvals/${listing?.id}`}
                className="block w-full h-full hover:text-primary transition-colors"
              >
                {listing?.make}
              </Link>
            </TableCell>
            <TableCell>
              <Link
                href={`/admin/approvals/${listing?.id}`}
                className="block w-full h-full hover:text-primary transition-colors"
              >
                {listing?.year}
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

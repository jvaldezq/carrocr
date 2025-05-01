import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const data = [
  {
    id: '001',
    firstName: 'Alice',
    lastName: 'Smith',
  },
  {
    id: '002',
    firstName: 'Bob',
    lastName: 'Johnson',
  },
  {
    id: '003',
    firstName: 'Charlie',
    lastName: 'Williams',
  },
  {
    id: '004',
    firstName: 'Diana',
    lastName: 'Brown',
  },
  {
    id: '005',
    firstName: 'Ethan',
    lastName: 'Jones',
  },
];

export default async function PendingProfileTable() {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((listing) => (
            <TableRow
              key={listing.id}
              className="hover:bg-primary hover:text-white cursor-pointer"
            >
              <TableCell className="font-medium">{listing.id}</TableCell>
              <TableCell>{listing.firstName}</TableCell>
              <TableCell>{listing.lastName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

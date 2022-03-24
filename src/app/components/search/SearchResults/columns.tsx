import TableAction from 'app/components/shared/TableAction/TableAction';
import to from 'app/routing/utils/to';

const columns = [
  { header: 'Adres', dataIndex: 'adres', minWidth: 100 },
  { header: 'Postcode', dataIndex: 'postcode', minWidth: 100 },
  {
    dataIndex: 'adresseerbaar_object_id',
    minWidth: 140,
    render: (bagId: any) => (
      <TableAction to={to('/adres/:bagId', { bagId })}>
        Bekijk
      </TableAction>
    ),
  },
];

export default columns;

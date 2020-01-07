import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { SortingState, Sorting, EditingColumnExtension } from '@devexpress/dx-react-grid';
import {
  Grid,
  VirtualTable,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';

import { CircularProgress } from '@material-ui/core';

const URL = 'https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/orders?requireTotalCount=true';
export default function TableTestBisBis() {

    const [columns] = useState([
        { name: 'OrderNumber', title: 'Order Number' },
        { name: 'OrderDate', title: 'Order Date' },
        { name: 'StoreCity', title: 'Store City' },
        { name: 'StoreState', title: 'Store State' },
        { name: 'Employee', title: 'Employee' },
        { name: 'SaleAmount', title: 'Sale Amount' },
      ]);
      const [rows, setRows] = useState([]);
      const [tableColumnExtensions] = useState<EditingColumnExtension[]>([
        { columnName: 'OrderNumber' },
        { columnName: 'SaleAmount' },
      ]);
      const [sorting, setSorting] = useState<Sorting[]>([{ columnName: 'StoreCity', direction: 'asc' }]);
      const [loading, setLoading] = useState(false);
      const [lastQuery, setLastQuery] = useState();
    
      const getQueryString = () => {
        let queryString = `${URL}`;
    
        if (sorting.length) {
          const sortingConfig = sorting
            .map(({ columnName, direction }) => ({
              selector: columnName,
              desc: direction === 'desc',
            }));
          const sortingStr = JSON.stringify(sortingConfig);
          queryString = `${queryString}&sort=${escape(`${sortingStr}`)}`;
        }
    
        return queryString;
      };
    
      const loadData = () => {
        const queryString = getQueryString();
        if (queryString !== lastQuery && !loading) {
          setLoading(true);
          fetch(queryString)
            .then(response => response.json())
            .then(({ data }) => {
              setRows(data);
              setLoading(false);
            })
            .catch(() => setLoading(false));
          setLastQuery(queryString);
        }
      };
    
      useEffect(() => loadData());
    
      return (
        <Paper style={{ position: 'relative' }}>
          <Grid
            rows={rows}
            columns={columns}
          >
            <SortingState
              sorting={sorting}
              onSortingChange={setSorting}
            />
            <VirtualTable
              columnExtensions={tableColumnExtensions}
            />
            <TableHeaderRow showSortingControls />
          </Grid>
          {loading && <CircularProgress />}
        </Paper>
      );

    
}

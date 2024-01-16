import { LayoutType, Layout } from '../../../index';

export default function(grid: LayoutType) {
  grid.lifecycle.set('onStart', function(grid: Layout) {
    const dimensions = grid.get('dimensions');
    const columns = dimensions.columns;
    const rows = dimensions.rows;

    const numColumns = columns.reduce(
      (acc: number, column: { count: number }) => acc + column.count,
      0
    );
    const numRows = rows.reduce(
      (acc: number, row: { count: number }) => acc + row.count,
      0
    );

    grid.inner.set('numColumns', numColumns);
    grid.inner.set('numRows', numRows);
  });
}

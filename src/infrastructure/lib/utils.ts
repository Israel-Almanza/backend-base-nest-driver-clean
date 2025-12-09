export function toJSON(result: any) {
  const rows = [];
  let count = 0;

  if (result) {
    if (result.rows && Array.isArray(result.rows)) {
      result.rows.map(item => {
        rows.push(item.toJSON());
      });
    }

    count = result.count || 0;
  }

  return {
    count,
    rows,
  };
}
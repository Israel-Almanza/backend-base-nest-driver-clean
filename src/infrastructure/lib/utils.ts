export interface QueryOptions {
  limit?: number;
  page?: number;
  order?: string; // ejemplo: "createdAt" o "-createdAt"
}

export function getQuery(options: any = {}) {
  const query: any = {
    where: {},
    order: []
  };

  // Pagination
  if (options.limit) {
    query.limit = Number(options.limit);
    query.offset = options.page
      ? (Number(options.page) - 1) * Number(options.limit)
      : 0;
  }

  // Order
  const orderField = options.order ?? 'createdAt';

  if (orderField.startsWith('-')) {
    query.order.push([orderField.substring(1), 'DESC']);
  } else {
    query.order.push([orderField, 'ASC']);
  }

  // Always add second sort by ID
  query.order.push(['id', 'ASC']);

  return query;
}

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
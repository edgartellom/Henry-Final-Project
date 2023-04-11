import axios  from "axios"

const dataProvider = {
    getList: async (resource, params) => {
        const response = await axios.get(`/${resource}`, {
            params: {
                ...params.filter,
                _sort: params.sort.field,
                _order: params.sort.order,
                _start: (params.pagination.page - 1) * params.pagination.perPage,
                _end: params.pagination.page * params.pagination.perPage,
            },
        });
        return {
            data: response.data,
            total: response.data.length //parseInt(response.headers['x-total-count'], 10),
        }
    },

}

export default dataProvider;
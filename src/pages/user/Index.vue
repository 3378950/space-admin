<template>
    <div class="page">

        <div class="q-pa-md q-gutter-sm">
            <q-btn color="primary" label="添加用户" />
        </div>

        <div class="q-pa-md">
            <q-table :rows="data" :columns="columns" row-key="name" hide-pagination />
        </div>

        <div class="row justify-center q-mt-md">
            <q-pagination
                    v-model="pagination.page"
                    color="grey-8"
                    :max="pagesNumber"
                    size="sm"
            />
        </div>
    </div>
</template>

<script>
    import { ref, computed } from 'vue';
    import { search } from "../../api/user";

    export default {
        name: "index",
        setup() {

            const columns = [
                {
                    field: 'id',
                    label: 'ID',
                    style: 'width: 50px'
                },
                {
                    field: 'username',
                    label: '用户名',
                },
                {
                    field: 'nickname',
                    label: '昵称',
                }
            ];

            const data = ref([]);

            const fetchData = () => {
                search({ page: 0}).then(res => {
                    data.value = data.value.concat(res.data.content);
                    pagination.value.page = res.data.number + 1;
                    pagination.value.rowsPerPage = res.data.size;
                    pagination.value.rowsNumber = res.data.totalElements;
                });
            };

            fetchData();

            const pagination = ref({
                page: 2,
                rowsPerPage: 10,
                rowsNumber: 10
            });

            const rows = [];

            return {
                columns,
                pagination,
                rows,
                data
            }
        }
    }
</script>

<style scoped>

</style>
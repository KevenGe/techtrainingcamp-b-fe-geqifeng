<template>
    <div>

        <div class="header">
            <setting></setting>
        </div>

        <div class="search">
            <icon></icon>
            <search @search="search"></search>
        </div>

        <foot style="position: fixed;bottom: 0"></foot>
    </div>
</template>

<script>
    import Icon from "../components/Icon";
    import Setting from "../components/Setting";
    import Search from "../components/Search";
    import Foot from "../components/Foot";

    export default {
        name: "Index",
        components: {
            Icon,
            Setting,
            Search,
            Foot
        },
        data: function () {
            return {
                settingShow: false,
                searchText: ""
            }
        },
        methods: {
            search: function (searchText) {
                console.log(searchText);
                this.searchText = searchText;
                console.log(this.searchText);
                this.$router.push({path: "result", "query": {searchText: searchText, currentPage: 1}})
            }
        }
    }
</script>

<style lang="less" scoped>
    .header {
        width: 100%;
        height: 7vh;
        text-align: left;
    }

    .search {
        margin: 100px auto auto;
    }

</style>
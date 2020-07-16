<template>
    <div :class="searchClass">
        <div class="searchInput">
            <div>
                <input type="text" v-model="searchText" @click="changeSearchState" placeholder="请输入搜索内容">
            </div>

            <template v-if="searchState===0 || searchState===2 ||searchText !=='' ">
                <div @click="handleSearch()">搜索一下</div>
            </template>
            <template v-else-if="searchState===1 && searchText ==='' ">
                <div @click="cancelSearch">取消</div>
            </template>

        </div>
        <div class="searchCandidate">
            <div>
                <template v-for="(item,index) in searchCandidateList">
                    <div :key="index" @click="handleSearch(item.keyword)">{{ item.keyword }}</div>
                </template>
            </div>
        </div>

    </div>
</template>

<script>
    import axios from "axios"

    export default {
        name: "Search",
        props: {
            searchTextInitial: {
                type: String
            },
            top: {
                type: Boolean,
                required: false
            }
        },
        data: function () {
            return {
                /**
                 * 0：默认的初始状态
                 * 1：默认的搜索状态（带候选栏）
                 * 2：默认的搜索状态（不带候选栏）
                 */
                searchState: 0,     // 显示当前状态是否是搜索输入阶段
                searchText: "",
                searchCandidateList: []
            }
        },
        computed: {
            searchClass: function () {
                if (this.searchState === 0) {
                    return "search";
                } else if (this.searchState === 1) {
                    return "search-top";
                } else if (this.searchState === 2) {
                    return "search-top-2";
                }
                return null;
            }
        },
        watch: {
            searchText: function () {
                this.getSearchCandidateList();
                // this.$emit("input", this.searchText);
            },

            searchTextInitial: function () {
                this.searchText = this.searchTextInitial;
            }
        },
        mounted: function () {
            console.log(this.top);
            if (this.top) {
                this.searchState = 2;
            }
        },
        methods: {
            changeSearchState: function () {
                this.searchState = 1;
            },

            getSearchCandidateList: function () {
                var _this = this;
                axios
                    .get("https://i.snssdk.com/search/api/sug/", {
                        params: {
                            keyword: _this.searchText
                        }
                    })
                    .then(function (response) {
                        if (response.data.code === 0) {
                            _this.searchCandidateList = response.data.data;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            },

            handleSearch: function (searchText) {
                console.log("search:::" + searchText);
                this.searchState = 2;
                if (searchText) {
                    this.$emit("search", searchText);
                } else {
                    this.$emit("search", this.searchText);
                }
            },

            cancelSearch: function () {
                this.searchState = 0;
                console.log(this.searchClass);
            }

        }
    }
</script>

<style lang="less" scoped>

    .search {
        z-index: 9;

        .searchInput {
            z-index: 9;
            width: 80%;
            height: 38px;
            background-color: blue;
            padding: 3px;
            box-sizing: border-box;
            margin: auto;

            position: fixed;
            top: 0;
            left: 10%;
            right: 10%;

            transition: 0.5s;
            transform: translateY(40vh);
            transform-origin: bottom;

            div {
                height: 32px;
                /*margin-bottom: 3px;*/
                /*margin-top: 3px;*/
                margin: 0;
                padding: 0;

                &:nth-of-type(1) {
                    width: 70%;
                    float: left;
                    background-color: white;
                }

                &:nth-of-type(2) {
                    width: 25%;
                    float: right;
                    color: white;
                    line-height: 32px;
                }
            }

        }

        .searchCandidate {
            z-index: 8;
            display: block;
            background-color: white;
            width: 100vw;
            height: 100vh;

            position: fixed;
            top: 38px;
            left: 0;
            right: 0;

            transition: 0.5s;
            opacity: 0;
        }
    }

    .search-top {
        .searchInput {
            z-index: 2;
            width: 100%;
            height: 38px;
            background-color: blue;
            padding: 3px;
            box-sizing: border-box;
            margin: auto;

            position: fixed;
            top: 0;
            left: 0;
            right: 0;

            transition: 0.5s;
            transform: translateY(0);

            div {
                height: 32px;
                /*margin-bottom: 3px;*/
                /*margin-top: 3px;*/
                margin: 0;
                padding: 0;

                &:nth-of-type(1) {
                    width: 70%;
                    float: left;
                    background-color: white;
                }

                &:nth-of-type(2) {
                    width: 25%;
                    float: right;
                    color: white;
                    line-height: 32px;
                }
            }
        }

        .searchCandidate {
            display: block;
            z-index: 1;
            background-color: white;
            width: 100vw;
            height: 100vh;

            position: fixed;
            top: 0;
            left: 0;
            right: 0;

            transition: 0.5s;
            opacity: 100%;

            div {
                margin-top: 40px;

                div {
                    margin-top: 0;
                    height: 38px;
                    margin-left: 10%;
                    margin-right: 10%;
                    line-height: 38px;

                    border-bottom: 1px solid gray;
                    text-align: left;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }
    }

    .search-top-2 {
        .searchInput {
            z-index: 2;
            width: 100%;
            height: 38px;
            background-color: blue;
            padding: 3px;
            box-sizing: border-box;
            margin: auto;

            position: fixed;
            top: 0;
            left: 0;
            right: 0;

            transition: 0.5s;
            transform: translateY(0);

            div {
                height: 32px;
                /*margin-bottom: 3px;*/
                /*margin-top: 3px;*/
                margin: 0;
                padding: 0;

                &:nth-of-type(1) {
                    width: 70%;
                    float: left;
                    background-color: white;
                }

                &:nth-of-type(2) {
                    width: 25%;
                    float: right;
                    color: white;
                    line-height: 32px;
                }
            }
        }

        .searchCandidate {
            display: block;
            z-index: -99;
            background-color: white;
            width: 100vw;
            height: 100vh;

            position: fixed;
            top: 0;
            left: 0;
            right: 0;

            transition: 0.5s;
            opacity: 0;
        }
    }

    input {
        outline: none;
        border: none;
        line-height: 32px;
        width: 100%;
        margin-left: 5px;
        margin-right: 5px;
    }
</style>
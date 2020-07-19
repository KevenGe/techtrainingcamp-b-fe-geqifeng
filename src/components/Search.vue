<template>
    <div :class="searchClass">
        <div class="searchInput">

            <template v-if="fix">
                <div>
                    <setting white></setting>
                </div>
            </template>

            <div>
                <label>
                    <input type="text" v-model="searchText" @click="changeSearchState" placeholder="请输入搜索内容">
                </label>
            </div>

            <template
                    v-if="searchState===0 || searchState===2 || searchState===3 || searchState===4 ||searchText !=='' ">
                <div @click="handleSearch()">搜索一下</div>
            </template>
            <template v-else-if="searchState===1 && searchText ==='' ">
                <div @click="cancelSearch">取消</div>
            </template>

        </div>

        <div class="searchCandidate" v-if="$store.state.showSearchCandidate">
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
    import Setting from "./Setting";

    export default {
        name: "Search",
        components: {Setting},
        props: {
            /// 初始化的文本内容
            searchTextInitial: {
                type: String
            },
            /// 显示是否在顶端，用来初始化的时候显示
            top: {
                type: Boolean,
                required: false
            },
            /// 是否固定显示在顶端，用在结果页展示
            fix: {
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
                 * 3：默认的搜索状态（不带候选栏，带设置）
                 * 4：默认的搜索状态（带候选栏，带设置）
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
                } else if (this.searchState === 3) {
                    return "search-top-3";
                } else if (this.searchState === 4) {
                    return "search-top-4";
                }
                return null;
            }
        },
        watch: {
            searchText: function () {
                this.getSearchCandidateList();
            },

            searchTextInitial: function () {
                this.searchText = this.searchTextInitial;
            }
        },
        mounted: function () {
            if (this.top) {
                this.searchState = 2;
                this.searchText = this.searchTextInitial;
            }

            if (this.fix) {
                this.searchState = 3;
            }

        },
        methods: {
            /**
             * @description 更改当前的状态
             */
            changeSearchState: function () {
                this.searchState = this.fix ? 4 : 1;
            },

            /**
             * @description 获取当前搜索候选的项目
             */
            getSearchCandidateList: function () {
                let _this = this;
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

            /**
             * @description 提交搜索请求，提交搜索请求
             */
            handleSearch: function (searchText) {
                this.searchState = this.fix ? 3 : 2;
                if (searchText) {
                    this.$emit("search", searchText);
                } else {
                    this.$emit("search", this.searchText);
                }
            },

            /**
             * @description 取消搜索，修改状态为0：默认的初始状态
             */
            cancelSearch: function () {
                if (this.fix) {
                    this.searchState = 2;
                } else {
                    this.searchState = 0;
                }
            }

        }
    }
</script>

<style lang="less" scoped>

    // 初始状态，主页，未搜索
    .search {
        z-index: 9;

        .searchInput {
            z-index: 9;
            width: 80%;
            height: 38px;
            background-color: #035aa6;
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

    // 主页搜索候选，
    .search-top {
        .searchInput {
            z-index: 9;
            width: 100%;
            height: 38px;
            background-color: #035aa6;
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
            z-index: 8;
            background-color: white;
            width: 100vw;
            height: 100vh;

            position: fixed;
            top: 0;
            left: 0;
            right: 0;

            transition: 0.5s;
            opacity: 1;

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

    // 结果页搜索候选，
    .search-top-2 {
        .searchInput {
            z-index: 9;
            width: 100%;
            height: 38px;
            background-color: #035aa6;
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

    // 结果页搜索不带候选，带设置
    .search-top-3 {
        .searchInput {
            z-index: 9;
            width: 100%;
            height: 38px;
            background-color: #035aa6;
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
                    width: 10%;
                    height: 100%;
                    float: left;
                    /*background-color: blue;*/
                }

                &:nth-of-type(2) {
                    width: 65%;
                    height: 100%;
                    float: left;
                    background-color: white;
                }

                &:nth-of-type(3) {
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

    // 结果页搜索带候选，带设置
    .search-top-4 {
        .searchInput {
            z-index: 9;
            width: 100%;
            height: 38px;
            background-color: #035aa6;
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
                    width: 10%;
                    height: 100%;
                    float: left;
                    /*background-color: blue;*/
                }

                &:nth-of-type(2) {
                    width: 65%;
                    height: 100%;
                    float: left;
                    background-color: white;
                }

                &:nth-of-type(3) {
                    width: 25%;
                    float: right;
                    color: white;
                    line-height: 32px;
                }
            }
        }

        .searchCandidate {
            display: block;
            z-index: 8;
            background-color: white;
            width: 100vw;
            height: 100vh;

            position: fixed;
            top: 0;
            left: 0;
            right: 0;

            transition: 0.5s;
            opacity: 1;

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

    input {
        outline: none;
        border: none;
        line-height: 32px;
        width: 100%;
        margin-left: 5px;
        margin-right: 5px;
    }
</style>
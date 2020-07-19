<template>
    <div class="pages">
        <div @click="toPriorPage" :class="[value === 1?'button-disable':'']"><img src="../assets/arrow_left.svg"
                                                                                  alt="左"><span>上一页</span></div>
        <div>第{{ value }}页</div>
        <div @click="toNextPage" :class="[$store.state.unlimitedScroll ?'button-disable':'']"><img
                src="../assets/arrow_right.svg" alt="右"><span>下一页</span></div>
    </div>
</template>

<script>
    export default {
        name: "PageSelect",
        props: {
            value: {
                type: Number
            }
        },
        data: function () {
            return {}
        },
        watch: {},
        methods: {

            /**
             * @description 转到下一页
             */
            toNextPage: function () {
                // this.value += 1;
                if (this.$store.state.unlimitedScroll === false) {
                    this.$emit("input", Number(this.value) + 1);
                }
            },

            /**
             * @description 转到上一页
             */
            toPriorPage: function () {
                if (this.value !== 1) {
                    this.$emit("input", Number(this.value) - 1);
                }
            }

        }
    }
</script>

<style lang="less" scoped>
    .pages {
        width: 100%;
        padding: 10px 10px 10px 10px;
        /*height: 32px;*/
        box-sizing: border-box;
        overflow: auto;

        div {
            height: 32px;

            &:nth-of-type(1) {
                float: left;

                img {
                    height: 32px;
                    float: left;
                    display: inline-block;
                }

                span {
                    height: 32px;
                    line-height: 32px;
                    float: left;
                    display: inline-block;
                    margin: 0;
                    padding: 0;
                }
            }

            &:nth-of-type(2) {
                line-height: 32px;
                display: inline-block;
                margin: auto;
            }

            &:nth-of-type(3) {
                float: right;

                img {
                    height: 32px;
                    float: right;
                    display: inline-block;
                }

                span {
                    height: 32px;
                    line-height: 32px;
                    float: right;
                    display: inline-block;
                    margin: 0;
                    padding: 0;
                }
            }
        }
    }

    .button-disable {
        opacity: 10%;
    }

</style>
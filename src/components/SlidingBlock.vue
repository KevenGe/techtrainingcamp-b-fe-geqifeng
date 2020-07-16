<template>
    <div :class="currentClass" @click="changValue">
        <div class="circle"></div>
    </div>
</template>

<script>
    export default {
        name: "SlidingBlock",
        props: {
            value: {
                type: Boolean
            }
        },
        data: function () {
            return {
                currentClass: "slide-false"
            }
        },
        watch: {
            value: function () {
                if (this.value) {
                    this.currentClass = "slide-true";
                } else {
                    this.currentClass = "slide-false";
                }
            }
        },
        mounted: function () {
            if (this.value) {
                this.currentClass = "slide-true";
            } else {
                this.currentClass = "slide-false";
            }
        },
        methods: {
            changValue: function () {
                // console.log(this.value);
                this.$emit("input", !this.value);
            }
        }
    }
</script>

<style lang="less" scoped>
    .slide-false {
        width: 40px;
        height: 20px;
        border-radius: 10px;
        background-color: red;
        transition: 0.5s;

        .circle {
            height: 20px;
            width: 20px;
            border-radius: 10px;
            background-color: white;
            box-sizing: border-box;
            border: 1px solid gray;

            transition: 0.5s;
            transform: translateX(0);
        }
    }

    .slide-true {
        width: 40px;
        height: 20px;
        border-radius: 10px;
        background-color: green;
        transition: 0.5s;

        .circle {
            height: 20px;
            width: 20px;
            border-radius: 10px;
            background-color: white;
            box-sizing: border-box;
            border: 1px solid gray;

            transition: 0.5s;
            transform: translateX(100%);
        }
    }

</style>
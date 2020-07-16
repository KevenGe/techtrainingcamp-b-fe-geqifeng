<template>

    <div>
        <template v-if="size === 'mini'">
            <div :class="iconStyle">
                小阳子
            </div>
        </template>
        <template v-else>
            <div :class="iconStyle">
                K
            </div>
        </template>
    </div>
</template>

<script>
    export default {
        name: "Icon",
        props: {
            size: {
                type: String,
                default: "mini"
            }
        },
        data: function () {
            return {
                iconStyle: "icon-mini"
            }
        },
        mounted() {
            this.iconStyle = "icon-" + this.size;
            this.continueAnimotion();
        },
        methods: {
            continueAnimotion: function () {
                this.iconStyle = this.iconStyle === "icon-mini" ? "icon-mini-top" : "icon-mini";
                setTimeout(this.continueAnimotion, 1000)
            }
        }
    }
</script>

<style lang="less" scoped>

    .icon-big {
        display: inline-block;
        font-size: 2rem;
        background-color: #0000ff;
        color: white;
        padding: 0.5rem;
        position: relative;
        box-sizing: border-box;
        border: 1px solid gray;
        letter-spacing: 0.5rem;

        transform: skewX(15deg) rotateZ(-10deg);
        transition: 1s;

        &::after {
            content: "";
            width: 100%;
            position: absolute;
            height: 1rem;
            background-color: black;
            bottom: -1rem;
            left: 0;
            transition: 1s;
            transform: skewX(-30deg);
            transform-origin: top right;

            box-sizing: border-box;
            border: 1px solid gray;
            box-shadow: 0 0 5px gray;
        }

        &::before {
            content: "";
            width: 0.6rem;
            height: 100%;
            position: absolute;
            background-color: black;
            bottom: 0;
            left: -0.6rem;
            transition: 1s;
            transform: skewY(-60deg);
            transform-origin: top right;

            box-sizing: border-box;
            border: 1px solid gray;
            box-shadow: 0 0 5px gray;
        }

    }

    .icon-big-top {
        display: inline-block;
        font-size: 2rem;
        background-color: #0000ff;
        color: white;
        padding: 0.5rem;
        position: relative;
        box-sizing: border-box;
        border: 1px solid gray;
        letter-spacing: 0.5rem;

        transform: skewX(15deg) rotateZ(-10deg) translate(7px, -12px);
        transition: 1s;

        &::after {
            content: "";
            width: 100%;
            position: absolute;
            height: 1rem;
            background-color: black;
            bottom: -1rem;
            left: 0;
            transition: 1s;
            transform: skewX(-30deg);
            transform-origin: top right;

            box-sizing: border-box;
            border: 1px solid gray;

            box-shadow: 5px 5px 5px gray;
        }

        &::before {
            content: "";
            width: 0.6rem;
            height: 100%;
            position: absolute;
            background-color: black;
            bottom: 0;
            left: -0.6rem;
            transition: 1s;
            transform: skewY(-60deg);
            transform-origin: top right;

            box-sizing: border-box;
            border: 1px solid gray;
            box-shadow: -3px 3px 5px gray;
        }
    }

    .icon-mini {
        display: inline-block;
        font-size: 2rem;
        background-color: #0000ff;
        color: white;
        padding: 0.5rem;
        position: relative;
        box-sizing: border-box;
        border: 1px solid gray;
        letter-spacing: 0.5rem;

        transform: skewX(15deg) rotateZ(-10deg);
        transition: 1s;

        &::after {
            content: "";
            width: 100%;
            position: absolute;
            height: 1rem;
            background-color: black;
            bottom: -1rem;
            left: 0;
            transition: 1s;
            transform: skewX(-30deg);
            transform-origin: top right;

            box-sizing: border-box;
            border: 1px solid gray;
            box-shadow: 0 0 5px gray;
        }

        &::before {
            content: "";
            width: 0.6rem;
            height: 100%;
            position: absolute;
            background-color: black;
            bottom: 0;
            left: -0.6rem;
            transition: 1s;
            transform: skewY(-60deg);
            transform-origin: top right;

            box-sizing: border-box;
            border: 1px solid gray;
            box-shadow: 0 0 5px gray;
        }

    }

    .icon-mini-top {
        display: inline-block;
        font-size: 2rem;
        background-color: #0000ff;
        color: white;
        padding: 0.5rem;
        position: relative;
        box-sizing: border-box;
        border: 1px solid gray;
        letter-spacing: 0.5rem;

        transform: skewX(15deg) rotateZ(-10deg) translate(7px, -12px);
        transition: 1s;

        &::after {
            content: "";
            width: 100%;
            position: absolute;
            height: 1rem;
            background-color: black;
            bottom: -1rem;
            left: 0;
            transition: 1s;
            transform: skewX(-30deg);
            transform-origin: top right;

            box-sizing: border-box;
            border: 1px solid gray;

            box-shadow: 5px 5px 5px gray;
        }

        &::before {
            content: "";
            width: 0.6rem;
            height: 100%;
            position: absolute;
            background-color: black;
            bottom: 0;
            left: -0.6rem;
            transition: 1s;
            transform: skewY(-60deg);
            transform-origin: top right;

            box-sizing: border-box;
            border: 1px solid gray;
            box-shadow: -3px 3px 5px gray;
        }
    }

</style>
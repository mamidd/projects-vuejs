<template>
    <div>
        <div>
            <slot name="title"></slot>
            <slot name="subtitle">The subtitle</slot>
        </div>
        <div>
            <slot name="content"></slot>
        </div>
    </div>
</template>

<style scoped>
    div {
        margin: 30px auto;
        text-align: center;
        padding: 30px;
        border: 1px solid gray;
        box-shadow: 1px 1px 2px black;
    }
</style>